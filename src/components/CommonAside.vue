<template>
  <el-aside class="aside" :width="width">
    <h3 class="aside-title">{{ topTitleName }}</h3>
    <el-menu class="aside-menu" :collapse="isCollapse" :collapse-transition="false">
      <el-menu-item index="0">
        <el-icon>
          <component :is="list[0].icon" />
        </el-icon>
        <span>{{ list[0].label }}</span>
      </el-menu-item>
      <el-menu-item index="1">
        <el-icon>
          <component :is="list[1].icon" />
        </el-icon>
        <span>{{ list[1].label }}</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon>
          <component :is="list[2].icon" />
        </el-icon>
        <span>{{ list[2].label }}</span>
      </el-menu-item>

      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <component :is="list[3].icon" />
          </el-icon>
          <span>{{ list[3].label }}</span>
        </template>
        <el-menu-item v-for="(item, index) in list[3].children" :index="(3 - index).toString">
          {{ item.label }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  House,
  VideoPlay,
  User
} from '@element-plus/icons-vue'

import { ref, computed } from 'vue'

import { useAllDataStore } from '@/store';

const allDataStore = useAllDataStore()

const isCollapse = computed(() => allDataStore.state.isCollapse)
const topTitleName = computed(() => !allDataStore.state.isCollapse ? "通用管理后台" : "后台")
const width = computed(() => {
  return allDataStore.state.isCollapse ? '100px' : '150px'
}
)
const list = ref([
  {
    path: '/home',
    name: 'home',
    label: '首页',
    icon: House,
    url: 'Home'
  },
  {
    path: '/mall',
    name: 'mall',
    label: '商品管理',
    icon: VideoPlay,
    url: 'Mall'
  },
  {
    path: '/user',
    name: 'user',
    label: '用户管理',
    icon: User,
    url: 'User'
  },
  {
    path: 'other',
    name: '其他',
    label: '其他',
    icon: Location,
    children: [
      {
        path: '/page1',
        name: 'page1',
        label: '页面1',
        icon: Setting,
        url: 'Page1'
      },
      {
        path: '/page2',
        name: 'page2',
        label: '页面2',
        icon: Setting,
        url: 'Page2'
      }
    ]
  }
])


</script>


<style lang="less" scoped>
@bg-color: #545c64;
@font-color: #fff;
@hover-bg-color: #b7c0ca;

.aside {
  background-color: @bg-color;
  border-right: 0.1px solid #ccc;
}
.aside-title{
  margin-left: 20px;
  margin-top: 5px;
  color: @font-color;
}
.aside-menu {
  border-right: none;
  --el-menu-bg-color: @bg-color;
  --el-menu-hover-bg-color: @hover-bg-color;
  --el-menu-text-color: @font-color;
}

</style>