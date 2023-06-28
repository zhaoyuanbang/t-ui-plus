<template>
  <t-layout-page>
    <t-layout-page-item style="position: relative;">
      <el-container>
        <el-aside :class="['aside__maia-default', isCollapse ? 'collapse' : 'no-collapse' ]">
          <t-sidebar
            :route-data="routeData"
            :is-collapse="isCollapse"
            title="菜单title"
            logoImg="../../public/img/logo.png"
          />
        </el-aside>
        <el-container>
          <el-header class="header__maia-default">
            <span>header</span>
          </el-header>
          <el-main>
            <span>main</span>
          </el-main>
        </el-container>
      </el-container>
      
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';


  const isCollapse = ref(false);

  const routeData = [
    {
      path: '/data',
      name: 'data',
      meta: {
        icon: 'menu-data',
        hideBreadcrumb: true,
        title: '数据看板',
      },
    },
    {
      path: '/report',
      name: 'report',
      meta: {
        icon: 'menu-report',
        hideBreadcrumb: true,
        title: '数据报表',
      },
    },
    {
      path: '/alarm',
      name: 'Alarm',
      redirect: '/alarm/index',
      meta: {
        icon: 'menu-alarm',
        hideBreadcrumb: true,
        title: '报警管理',
      },
    },
    {
      path: '/device',
      name: 'Device',
      redirect: '/device/collector',
      meta: {
        icon: 'menu-collector',
        hideBreadcrumb: true,
        title: '设备管理',
      },
      children: [
        {
          path: '/device/collector',
          name: 'device-collector',
          meta: {
            title: '采集器管理',
            hideBreadcrumb: true,
          },
        },
        {
          path: '/device/meter',
          name: 'device-meter',
          meta: {
            title: '表具管理',
            hideBreadcrumb: true,
          },
        }
      ],
    }
  ]
</script>

<style scoped lang="scss">
  @import './index';
</style>