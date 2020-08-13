<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请选择机构名称', trigger: 'change' }],
      },
    }
  },
  computed: {
    ...mapState({
      app: state => state.target.app,
    }),
    show: {
      get() {
        return this.app.showDialog
      },
      set(val) {
        this.updateShowDialog(val)
      },
    },
    id: {
      get() {
        return this.app.detail.id
      },
      set(val) {
        this.updateId(val)
      },
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions('target/app', ['getList', 'add']),
    ...mapMutations('target/app', ['updateShowDialog', 'updateId', 'resetDetail']),
    handleSubmit() {
      this.$refs.appForm.validate(valid => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async submit() {
      await this.add()
      this.show = false
      this.getList()
    },
    closed() {
      this.$refs.appForm.resetFields()
      this.resetDetail()
    },
  },
}
</script>

<template>
  <el-dialog
    id="app-dialog"
    ref="appForm"
    @closed="closed"
    title="新增xID映射服务成员"
    :visible.sync="show"
    width="490px"
    append-to-body
  >
    <el-form size="small" :model="app.detail" :rules="rules" ref="appForm" label-width="85px">
      <el-form-item label="机构名称:" prop="name">
        <el-select v-model="id" filterable placeholder="请选择机构名称" style="width: 100%;">
          <el-option
            v-for="item in app.memberList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="成员编号:" prop="name">
        <div class="member-id">{{app.detail.id}}</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button size="small" type="primary" @click="handleSubmit">提 交</el-button>
      <el-button size="small" @click="show = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
@import '@/style/el-dialog-rewrite.scss';
#app-dialog {
  .el-form-item {
    span,
    .el-input--small,
    .el-form-item__label {
      font-size: 12px;
    }
    .el-button--mini {
      padding: 5px 15px;
      text-align: center;
    }
    .mix-box {
      @include flex-center(y);
      > span {
        margin-right: 5px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .member-id {
      padding: 0 5px;
      font-size: 12px;
    }
  }
}
</style>
