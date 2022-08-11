<template>
    <div class="homepage_container">
        <div class="homepage_header">头部</div>
        <div class="homepage_menu">
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                default-active="2" text-color="#fff" :unique-opened="true" :router="true">
                <el-sub-menu :index="menu.id + ''" v-for="menu in newMenus" :key="menu.id">
                    <template #title>
                        <span>{{ menu.title }}</span>
                    </template>
                    <template v-for="submenu in menu.children" :key="submenu.id">
                        <el-menu-item :index="'/' + menu.name + '/' + submenu.name + ''" v-if="submenu.hidden">
                            {{ submenu.title }}
                        </el-menu-item>
                    </template>
                </el-sub-menu>
            </el-menu>
        </div>
        <div class="homepage_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
interface MenuObj {
    parentId: number;
    id: number;
    title: string;
    hidden: 0 | 1;
    name: string;
    children?: MenuObj[];
}
interface newMenus {
    [key: number]: MenuObj;
}

const store = useStore()
const newMenus = computed<newMenus>(() =>
    store.getters.getNewMenus
)

</script>

<style lang="less" scoped>
.homepage_container {
    position: relative;
    height: 100%;
}

.homepage_header {
    height: 80px;
    background-color: skyblue;
}

.homepage_menu {
    position: absolute;
    top: 80px;
    left: 0;
    bottom: 0;
    width: 250px;
}

.homepage_content {
    position: absolute;
    top: 80px;
    right: 0;
    bottom: 0;
    left: 250px;
}
</style>