<template>
    <div class="root-content">
        <div class="l-content">
            <el-button size="small" :icon="Menu" @click="handleCollapse">
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span>
                    <img :src="getImgUrl('user')" alt="">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArrowRight, ArrowDown, Menu } from '@element-plus/icons-vue'
import { computed } from 'vue';
import { useAllDataStore } from '@/store';

const allDataStore = useAllDataStore()

const handleCollapse = () => {
    console.log('handleCollapse')
    allDataStore.state.isCollapse = !allDataStore.state.isCollapse
}


const getImgUrl = (user) => {
    return new URL(`../assets/image/${user}_header.png`, import.meta.url).href
}

</script>

<style scoped lang="less">
@bg-color: #545c64;

.root-content {
    width: 100%;
    display: flex;
    padding-left: 10px;
    justify-content: space-between;
    background-color: @bg-color;
}

.l-content {
    display: flex;
    align-items: center;
    .el-button {
        margin-right: 5px;
    }
}

.r-content {
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 2px;

    margin-right: 20px;
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
}

:deep(.bread span) {
    color: #fff !important;
    cursor: pointer !important;
}
</style>