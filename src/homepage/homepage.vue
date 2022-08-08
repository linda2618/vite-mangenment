<template>
    <div class="homepage_container">
        <div class="homepage_header">头部</div>
        <div class="homepage_menu">菜单</div>
        <div class="homepage_content">右侧内容</div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.homepage_container {
    position: relative;
    height: 100%;
}

.homepage_header {
    height: 80px;
    background-color: pink;
}

.homepage_menu {
    position: absolute;
    top: 80px;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: green;
}

.homepage_content {
    position: absolute;
    top: 80px;
    right: 0;
    bottom: 0;
    left: 250px;
    background-color: blue;
}
</style>