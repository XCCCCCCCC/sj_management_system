<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import appDialog from '@/components/target/appDialog'
import appKeyDialog from '@/components/target/appKeyDialog'
export default {
  name: '',
  components: { appDialog, appKeyDialog },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      app: state => state.target.app,
    }),
    keyword: {
      get() {
        return this.app.keyword
      },
      set(val) {
        this.updateKeyword(val)
      },
    },
    page: {
      get() {
        return this.app.page
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
    ...mapActions('target/app', ['getList', 'toggleStatus']),
    ...mapMutations('target/app', ['updateKeyword', 'updatePage', 'updateShowKeyDialog', 'updateShowDialog', 'updateKeyDetail']),
    handleAdd() {
      this.updateShowDialog(true)
    },
    async handleStart(i, row) {
      this.updateKeyDetail(row)
      await this.toggleStatus('00')
      this.getList()
    },
    async handleStop(i, row) {
      this.updateKeyDetail(row)
      await this.toggleStatus('01')
      this.getList()
    },
    handleKey(i, row) {
      this.updateKeyDetail(row)
      this.updateShowKeyDialog(true)
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
  <div id="target-app">
    <div class="top-wrapper">
      <span>xID映射应用管理</span>
      <el-button size="small" type="primary" @click="handleAdd">新增应用</el-button>
    </div>
    <div class="bottom-wrapper">
      <div class="search-wrapper">
        <el-input
          size="small"
          clearable
          class="search__input"
          placeholder="请输入需要查询的应用名称"
          v-model="keyword"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="small" class="search__button" type="primary" @click="handleSearch">查询</el-button>
      </div>
      <el-table
        header-row-class-name="table-header-row"
        row-class-name="table-body-row"
        :data="app.list"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <template v-for="(col, index) in app.tableHeader">
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
          >
            <template slot-scope="scope">
              <span v-html="col.render(scope.row[col.prop])"></span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status !== '00'"
              size="mini"
              type="text"
              @click="handleStart(scope.$index, scope.row)"
            >启用</el-button>
            <el-button
              v-else
              size="mini"
              type="text"
              @click="handleStop(scope.$index, scope.row)"
            >停用</el-button>
            <el-button size="mini" type="text" @click="handleKey(scope.$index, scope.row)">密钥</el-button>
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
          :total="app.total"
        ></el-pagination>
      </div>
    </div>
    <app-dialog></app-dialog>
    <app-key-dialog></app-key-dialog>
  </div>
</template>

<style lang="scss">
#target-app {
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
        color: #333333 !important;
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
          height: 24px !important;
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
      height: 36px;
      line-height: 36px;
    }
    .pagination-wrapper {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
