<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import memberDialog from '@/components/target/memberDialog'
export default {
  name: '',
  components: { memberDialog },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      member: state => state.target.member,
    }),
    keyword: {
      get() {
        return this.member.keyword
      },
      set(val) {
        this.updateKeyword(val)
      },
    },
    page: {
      get() {
        return this.member.page
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
    ...mapActions('target/member', ['getList']),
    ...mapMutations('target/member', ['updateKeyword', 'updatePage', 'updateType', 'updateShowDialog', 'resetDetail', 'updateDetail']),
    handleDetail(i, row) {
      this.updateType('detail')
      this.updateDetail(row)
      this.updateShowDialog(true)
    },
    handleAdd() {
      this.updateType('add')
      this.updateShowDialog(true)
    },
    handleEdit(i, row) {
      this.updateType('edit')
      this.updateDetail(row)
      this.updateShowDialog(true)
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
  <div id="target-member">
    <div class="top-wrapper">
      <span>xID映射成员管理</span>
      <el-button size="small" type="primary" @click="handleAdd">新增成员</el-button>
    </div>
    <div class="bottom-wrapper">
      <div class="search-wrapper">
        <el-input
          size="small"
          clearable
          class="search__input"
          placeholder="请输入需要查询的成员名称"
          v-model="keyword"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="small" class="search__button" type="primary" @click="handleSearch">查询</el-button>
      </div>
      <el-table
        header-row-class-name="table-header-row"
        row-class-name="table-body-row"
        :data="member.list"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column
          v-for="(col, index) in member.tableHeader"
          show-overflow-tooltip
          :key="index"
          :prop="col.prop"
          :label="col.label"
          align="center"
          :min-width="col.minWidth || 100"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          :total="member.total"
        ></el-pagination>
      </div>
    </div>
    <member-dialog></member-dialog>
  </div>
</template>

<style lang="scss">
#target-member {
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
        color: #333333;
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
