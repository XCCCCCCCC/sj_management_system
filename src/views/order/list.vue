<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      list: state => state.order.list,
    }),
    keyword: {
      get() {
        return this.list.keyword
      },
      set(val) {
        this.updateKeyword(val)
      },
    },
    page: {
      get() {
        return this.list.page
      },
      set(val) {
        this.updatePage(val)
      },
    },
  },
  watch: {},
  mounted() {
    this.getList()
  },
  methods: {
    ...mapActions('order/list', ['getList']),
    ...mapActions('order/operation', ['toggleStatus']),
    ...mapMutations('order/list', ['updateKeyword', 'updatePage', 'updateType', 'updateShowKeyDialog', 'updateShowDialog']),
    ...mapMutations('order/operation', ['updateType', 'updateDetail', 'resetDetail']),
    handleAdd() {
      this.updateType('add')
      this.resetDetail()
      this.$router.push({ path: '/order/operation' })
    },
    handleEdit(i, row) {
      this.updateType('update')
      this.updateDetail(row)
      this.$router.push({ path: '/order/operation', query: row.id })
    },
    async handleStart(i, row) {
      this.updateDetail(row)
      await this.toggleStatus('00')
      this.getList()
    },
    async handleStop(i, row) {
      this.updateDetail(row)
      await this.toggleStatus('01')
      this.getList()
    },
    handleDetail(i, row) {
      this.updateType('detail')
      this.$router.push({ path: '/order/operation', query: row.id })
    },
    handleCurrentChange() {
      this.getList()
    },
    handleSearch() {
      this.updatePage(1)
      this.getList()
    },
  },
}
</script>

<template>
  <div id="order-list">
    <div class="top-wrapper">
      <span>xID映射服务列表</span>
      <el-button size="small" type="primary" @click="handleAdd">新增xID映射服务</el-button>
    </div>
    <div class="bottom-wrapper">
      <div class="search-wrapper">
        <el-input
          size="small"
          clearable
          class="search__input"
          placeholder="请输入需要查询的服务工单号或服务名称"
          v-model="keyword"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="small" class="search__button" type="primary" @click="handleSearch">查询</el-button>
      </div>
      <el-table
        header-row-class-name="table-header-row"
        row-class-name="table-body-row"
        :data="list.list"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <template v-for="(col, index) in list.tableHeader">
          <el-table-column
            v-if="!col.render"
            show-overflow-tooltip
            :key="index"
            :prop="col.prop"
            :label="col.label"
            align="center"
            :min-width="col.minWidth || 100"
          ></el-table-column>
          <el-table-column
            v-else
            show-overflow-tooltip
            :key="index"
            :label="col.label"
            align="center"
            :min-width="col.minWidth || 100"
          >
            <template slot-scope="scope">
              <span v-html="col.render(scope.row)"></span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" :min-width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.status !== '00'"
              size="mini"
              type="text"
              @click="handleStart(scope.$index, scope.row)"
            >生效</el-button>
            <el-button
              v-else
              size="mini"
              type="text"
              @click="handleStop(scope.$index, scope.row)"
            >失效</el-button>
            <el-button size="mini" type="text" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-wrapper">
        <el-pagination
          @current-change="handleCurrentChange"
          prev-text="上一页"
          next-text="下一页"
          :current-page.sync="page"
          layout="prev, pager, next"
          :total="list.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#order-list {
  .top-wrapper {
    margin-bottom: 20px;
    padding: 0 0 0 20px;
    @include flex-center(y);
    justify-content: space-between;
  }
  .bottom-wrapper {
    padding: 20px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    background-color: #fff;
    text-align: left;
    .search-wrapper {
      margin-bottom: 20px;
      .search__input {
        margin-right: 20px;
        width: 380px;
      }
      .search__button {
      }
    }
    .table-header-row {
      background-color: #f5f5f5;
      th {
        padding: 6px 0;
        background-color: transparent;
        color: #1f1b1b !important;
        .cell {
          height: 24px !important;
          line-height: 24px !important;
          font-size: 12px;
        }
      }
    }
    .table-body-row {
      td {
        padding: 6px 0;
        background-color: transparent;
        color: #333333;
        .cell {
          // height: 24px !important;
          line-height: 24px !important;
          font-size: 12px;
          .available {
            color: #30bc9b;
          }
          .unavailable {
            color: #a6a6a6;
          }
        }
      }
    }
    .el-table__empty-block,
    .el-table__empty-text {
      min-height: 36px;
      // height: 36px;
      line-height: 36px;
    }
    .pagination-wrapper {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
