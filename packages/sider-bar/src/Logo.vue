<template>
  <section
    :class="[
      'logo-wrap',
      isCollapse ? 'center' : '',
      'logo-wrap__side'
    ]"
  >
    <router-link
      v-if="!isCollapse"
      to="/"
      class="logo-content"
    >
      <img
        v-if="logoImg"
        :src="logoImg"
        :class="['sidebar-logo', 'ml-4']"
      />
      <span class="maia-system-title">{{ title }}</span>
    </router-link>

    <section
      class="collapse"
    >
      <span
        v-if="isCollapse"
        :class="['collapse-btn', 'open']"
        @click="changeCollapse(false)"
      >
        <t-svg-icon
          icon-class="btn-collapse"
          class-name="btn"
        />
      </span>
      <span
        v-else
        class="collapse-btn"
        @click="changeCollapse(true)"
      >
        <svg-icon
          icon-class="btn-collapse"
          class-name="btn"
        />
      </span>
    </section>
  </section>
</template>
<script lang="ts" setup>
  defineProps({
    isCollapse: {
      type: Boolean,
      default: () => false,
    },
    logoImg: {
      type: String,
      default: () => '',
    },
    title: {
      type: String,
    }
  });

  const emit = defineEmits(['changeCollapse']);


  const changeCollapse = (val: boolean) => {
    emit('changeCollapse', val);
  }

</script>

<style lang="scss" scoped>
  .logo-wrap {

    box-sizing: border-box;
    height: 48px;
    padding-right: 10px;

    .logo-content {
      display: flex;
      align-items: center;
    }

    .sidebar-logo {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      margin-left: 16px;

      &.ml-4 {
        margin-left: 4px;
      }
    }

    &.center {
      justify-content: center;
      padding-right: 0;
    }

    &.logo-wrap__mix {
      margin-right: 12px;
    }
  }

  .collapse {
    .collapse-btn {
      height: 36px;
      padding: 4px 6px;
      font-size: 20px;
      cursor: pointer;

      &.open {
        &:not(.mix) {
          margin-right: 0;
        }

        .btn {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
