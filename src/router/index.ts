import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { App, nextTick } from "vue";
// import { useStore } from "vuex";
import store from "../store/index";
import { getAdminInfoApi } from "../request/api";

//import Vue from 'vue
//Vue.use(VueRouter)
//Vue2 use ：调用的就是参数上的install 方法，或者直接调用参数。Vue.prototype.$router/$route

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
  },

  {
    path: "/homepage",
    name: "homepage",
    component: () => import("../homepage/homepage.vue"),
  },

  // {
  //   path: "/pms",
  //   name: "pms",
  //   component: () => import("../homepage/homepage.vue"),
  //   children: [
  //     {
  //       path: "updateProductCate",
  //       name: "updateProductCate",
  //       component: () => import("../views/login/pms/updateProductCate.vue"),
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, //路由配置
});

// 根据getters 里面的菜单对象生成路由规则
const genRoutes = () => {
  const menus = store.getters.getNewMenus;
  // const newRoutes: RouteRecordRaw[] = [];
  //循环菜单对象
  for (let k in menus) {
    const newRoutes: RouteRecordRaw = {
      path: "/" + menus[k].name,
      name: menus[k].name,
      component: () => import("../homepage/homepage.vue"),
      redirect: "/" + menus[k].name + "/" + menus[k].children[0].name,
      children: [],
    };
    for (let i = 0; i < menus[k].children.length; i++) {
      newRoutes.children?.push({
        path: menus[k].children[i].name,
        name: menus[k].children[i].name,
        component: () =>
          import(
            `../views/login/${menus[k].name}/${menus[k].children[i].name}.vue`
          ),
      });
    }
    //动态添加路由规则
    router.addRoute(newRoutes);
  }
  //动态添加首页
  router.addRoute({
    path: "/",
    name: "homepage",
    component: () => import("../homepage/homepage.vue"),
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("../views/index/index.vue"),
      },
    ],
  });
};

//前置导航守卫
router.beforeEach((to, from, next) => {
  //1.token && vuex里面menus(权限列表)为空(被刷新)
  // const store = useStore();
  const token = window.sessionStorage.getItem("token");
  if (token && store.state.menus.length === 0) {
    console.log("menus为空");
    // getAdminInfoApi().then((res) => {
    //   if (res.code === 200) {
    //     store.commit("updateMenus", res.data.menus);
    //     console.log(11);
    //   }
    // });
    //异步
    store.dispatch("getAdminInfo").then(() => {
      genRoutes();
      next(to);
    });
  } else if (
    token &&
    store.state.menus.length !== 0 &&
    from.path === "/login" &&
    to.path === "/index"
  ) {
    //动态添加路由规则
    genRoutes();
    next("/index");
  } else if (!token && to.path !== "/login") {
    next("/login");
  } else if (token && to.path === "/login") {
    next(from);
  } else {
    next();
  }
});
//将app传入路由文件中
export const initRouter = (app: App<Element>) => {
  app.use(router);
};
// export default router;
