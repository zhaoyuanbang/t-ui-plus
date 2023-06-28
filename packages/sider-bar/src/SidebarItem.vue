<template>
  <section v-if="!(item.meta && item.meta.hidden)">
    <app-link
      v-if="hasOneShowingChild(item.children, item)
        && !state.onlyOneChild.children
        && !item.meta?.visible 
        && state.onlyOneChild.meta"
      :to="resolvePath(state.onlyOneChild.path)"
      :is-blank="state.onlyOneChild.meta && state.onlyOneChild.meta.isBlank"
    >
      <el-menu-item
        :index="resolvePath(state.onlyOneChild.path)"
        :class="{'no-drop': !isNest}"
      >
        <!-- 菜单icon尽量让设计师设计 -->
        <t-svg-icon
          v-if="state.onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
          :icon-class="state.onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
          :class-name="isCollapse ? 'menu-icon' : 'menu-icon mr-6'"
        />
        <template #title>
          {{ state.onlyOneChild.meta.title }}
        </template>
      </el-menu-item>
    </app-link>

    <el-sub-menu
      v-else
      :index="resolvePath(item.path)"
    >
      <template
        v-if="item.meta"
        #title
      >
        <t-svg-icon
          v-if="item.meta.icon"
          :icon-class="item.meta.icon"
          :class-name="isCollapse ? 'menu-icon' : 'menu-icon mr-6'"
        />
        <span>{{ item.meta.title || '' }}</span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-nest="true"
        :base-path="resolvePath(child.path)"
        :is-collapse="isCollapse"
        class="nest-menu"
      />
    </el-sub-menu>
  </section>
</template>
<script lang="ts" setup>
  import { defineComponent, reactive, toRefs } from 'vue';
  import path from 'path-browserify';
  import AppLink from './Link.vue';

  export interface InterfaceObj {
    [key: string]: any
  }

  interface InterfaceState {
    onlyOneChild: InterfaceObj,
    basePath: string
  }

  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  });

  const state: InterfaceState = reactive({
    onlyOneChild: {},
    basePath: '',
  });

  const isExternal = (path: string): boolean => {
    return /^(https?:|mailto:|tel:)/.test(path);
  };

  const hasOneShowingChild = (children: any, parent: any): boolean => {
    children = children || [];
    const showingChildren = children.filter((item: any) => {
      if (item.hidden) {
        return false;
      }
      state.onlyOneChild = item;
      return !(item.meta && item.meta.hidden);
    });
    if (showingChildren.length === 1) {
      // When there is only one child router, the child router is displayed by default
      state.onlyOneChild = children[0];
      return true;
    }
    if (showingChildren.length === 0) {
      // Show parent if there are no child router to display
      state.onlyOneChild = { path: '', ...parent };
      return true;
    }
    return false;
  };

  const resolvePath = (routePath: any): string => {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(props.basePath)) {
      return props.basePath;
    }
    return path.resolve(props.basePath, routePath);
  };
</script>
<style lang="scss" scoped>
  .menu-icon {
    font-size: 16px;

    &.mr-6 {
      margin-right: 6px;
    }
  }

  :deep(.el-menu-item) {
    // 解决折叠时 菜单icon 抖动问题
    div {
      display: flex !important;
      align-items: center !important;
    }
  }
</style>
