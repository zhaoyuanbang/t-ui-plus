<template>
  <section class="t-sidebar">
    <logo
      :is-collapse="isCollapse"
      :title="title"
      :logoImg="logoImg"
      @change-collapse="handleChangeCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routeData"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </section>
</template>
<script lang="ts" setup>
  import SidebarItem from './SidebarItem.vue';
  import Logo from './Logo.vue';

  defineProps({
    isCollapse: {
      type: Boolean,
      default: false,
    },
    routeData: {
      type: Object,
      default: () => ({}),
    },
    activeMenu: {
      type: String,
      default: () => '',
    },
    title: {
      type: String,
      default: () => '',
    },
    logoImg: {
      type: String,
      default: () => '',
    },
  })
  const emit = defineEmits(['changeCollapse']);

  const handleChangeCollapse = (val: boolean) => {
    emit('changeCollapse', val);
  }
</script>

<style lang="scss" scoped>
  .t-sidebar {
    width: 180px;
    height: 100%;
    overflow-y: hidden;

    :deep(.scrollbar-wrapper) {
      height: calc(100% - 48px) !important;
      overflow-x: hidden;

      &.mix {
        height: 100% !important;
      }
    }

    :deep(.is-horizontal) {
      display: none;
    }

    // 修改 collapse 时的默认样式
    :deep(.el-menu--collapse) {
      .el-sub-menu__title {
        span {
          display: none !important;
        }
      }

      .el-sub-menu__icon-arrow {
        display: none !important;
        opacity: 0 !important;
      }
    }

    // 修改menu和menu-item的默认样式
    :deep(.el-menu) {
      border-right-width: 0;

      .el-menu-item {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
