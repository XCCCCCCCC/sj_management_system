<script>
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    to(name) {
      this.$router.push({ name })
    },
  },
}
</script>

<template>
  <ul id="the-menu">
    <li
      @click="to('targetMember')"
      class="the-menu__item"
      :class="$route.name === 'targetMember' || $route.name === 'targetApp' ? 'active' : ''"
    >
      <icon-svg iconClass="target"></icon-svg>
      <span>xID映射服务对象管理</span>
    </li>
    <li
      @click="to('orderList')"
      class="the-menu__item"
      :class="$route.name === 'orderList' || $route.name === 'orderOperation' ? 'active' : ''"
    >
      <icon-svg iconClass="list"></icon-svg>
      <span>xID映射服务列表</span>
    </li>
    <li @click="to('log')" class="the-menu__item" :class="$route.name === 'log' ? 'active' : ''">
      <icon-svg iconClass="log"></icon-svg>
      <span>xID映射业务日志</span>
    </li>
  </ul>
</template>

<style lang="scss">
#the-menu {
  li {
    margin-top: 8px;
    padding: 0 20px;
    @include flex-center(y);
    @include text-size(14px, 48px);
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    &.active {
      background-color: $main-color;
    }
    svg {
      margin-right: 16px;
    }
  }
}
</style>
