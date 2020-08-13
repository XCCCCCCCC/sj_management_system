<script>
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      tabActiveName: '',
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.tabActiveName = this.$route.name
  },
  methods: {
    handleClick(tab) {
      // console.log(tab)
      this.$router.push({ name: tab.name })
    },
  },
}
</script>

<template>
  <div id="target">
    <el-tabs v-model="tabActiveName" @tab-click="handleClick">
      <el-tab-pane label="xID映射成员管理" name="targetMember"></el-tab-pane>
      <el-tab-pane label="xID映射应用管理" name="targetApp"></el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>

<style lang="scss">
#target {
  .el-tabs {
    margin-bottom: 20px;
    padding: 0 25px;
    background: #fff;
    box-shadow: 0px -1px 0px 0px rgba(229, 229, 229, 1);
    .el-tabs__header {
      margin: 0;
      background-color: #fff;
      @include text-size(16px, 55px);
      .el-tabs__nav-wrap::after {
        display: none;
      }
    }
  }
}
</style>
