<script>
import theMenu from '@/components/theMenu.vue'
export default {
  name: '',
  components: { theMenu },
  props: [],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>
<template>
  <div id="app">
    <el-container>
      <el-header id="header-wrapper" height="72px">
        <img class="brand" src="@/assets/images/brand.png" />
        <div class="logout">
          <!-- <router-link to="/">Home</router-link>|
          <router-link to="/about">About</router-link>|
          <router-link to="/target">对象</router-link>|
          <router-link to="/service">服务列表</router-link>-->
          <icon-svg iconClass="logout"></icon-svg>
          <span>退出登录</span>
        </div>
      </el-header>
      <el-container id="container-wrapper">
        <el-aside id="aside-wrapper" width="220px">
          <the-menu></the-menu>
        </el-aside>
        <el-container>
          <el-main id="main-wrapper">
            <router-view />
          </el-main>
          <el-footer
            id="footer-wrapper"
            height="40px"
          >Copyright © 2018 Shanghai Data Exchange Platform</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100%;
  min-width: 1360px;
  #header-wrapper {
    @include flex-center(y);
    justify-content: space-between;
    .brand {
      height: 44px;
      width: auto;
    }
    .logout {
      @include flex-center(y);
      @include text-size(16px, 16px);
      color: #666666;
      cursor: pointer;
      svg {
        margin-right: 3px;
      }
      span {
        @include text-size(14px, 16px);
      }
    }
  }
  #container-wrapper {
    // height: calc(100% - 70);
    height: 0;
  }
  #aside-wrapper {
    background-color: #424347;
  }
  #main-wrapper {
    background-color: #f0f0f0;
    overflow-y: auto;
    // overflow: hidden;
  }
  #footer-wrapper {
    padding: 0 20px;
    @include text-size(12px, 40px);
    text-align: right;
    color: #bab1b4;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
