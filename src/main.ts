import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import { initRouter } from "./router";
import { initStore } from "./store/index";

const app = createApp(App);
// app.use(router);
//初始化路由
initRouter(app);
initStore(app);
app.mount("#app");
