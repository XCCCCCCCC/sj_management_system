<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ClipboardJS from 'clipboard'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      publicKeyClipboard: null,
      privateKeyClipboard: null,
      rules: {
        xAppCode: [{ required: true, message: '请输入xAppCode', trigger: 'blur' }],
        xRegCode: [{ required: true, message: '请输入xRegcode', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState({
      app: state => state.target.app,
    }),
    show: {
      get() {
        return this.app.showKeyDialog
      },
      set(val) {
        this.updateShowKeyDialog(val)
      },
    },
    xAppCode: {
      get() {
        return this.app.keyDetail.xAppCode
      },
      set(val) {
        this.updateXAppCode(val)
      },
    },
    xRegCode: {
      get() {
        return this.app.keyDetail.xRegCode
      },
      set(val) {
        this.updateXRegCode(val)
      },
    },
  },
  watch: {},
  destroyed() {
    this.publicKeyClipboard.destroy()
    this.privateKeyClipboard.destroy()
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('target/app', ['getList', 'getDetail', 'update']),
    ...mapMutations('target/app', ['updateShowKeyDialog', 'updateXRegCode', 'updateXAppCode']),
    init() {
      const self = this
      this.publicKeyClipboard = new ClipboardJS('#public-key-btn')
      this.publicKeyClipboard.on('success', function(e) {
        self.$message({
          message: '复制成功',
          type: 'success',
        })
      })

      this.publicKeyClipboard.on('error', function(e) {
        self.$message({
          message: '复制失败',
          type: 'error',
        })
      })
      this.privateKeyClipboard = new ClipboardJS('#private-key-btn')
      this.privateKeyClipboard.on('success', function(e) {
        self.$message({
          message: '复制成功',
          type: 'success',
        })
      })

      this.privateKeyClipboard.on('error', function(e) {
        self.$message({
          message: '复制失败',
          type: 'error',
        })
      })
    },
    handleSubmit() {
      this.$refs.appKeyForm.validate(valid => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async submit() {
      await this.update()
      this.show = false
      this.getList()
    },
    closed() {
      this.$refs.appKeyForm.resetFields()
    },
  },
}
</script>

<template>
  <el-dialog
    id="app-key-dialog"
    ref="appKeyForm"
    @closed="closed"
    title="密钥详情"
    :visible.sync="show"
    width="490px"
    append-to-body
  >
    <el-form size="small" :model="app.keyDetail" :rules="rules" ref="appKeyForm" label-width="85px">
      <el-form-item label="成员编号:">
        <span class="info">{{app.keyDetail.id}}</span>
      </el-form-item>
      <el-form-item label="机构名称:">
        <span>{{app.keyDetail.name}}</span>
      </el-form-item>
      <el-form-item label="应用编号:">
        <span>{{app.keyDetail.appId}}</span>
      </el-form-item>
      <el-form-item label="公钥:">
        <div class="mix-box">
          <span>{{app.keyDetail.publicKey}}</span>
          <el-button
            id="public-key-btn"
            :data-clipboard-text="app.keyDetail.publicKey"
            type="primary"
            size="mini"
          >复制</el-button>
        </div>
      </el-form-item>
      <el-form-item label="私钥:">
        <div class="mix-box">
          <span>{{app.keyDetail.privateKey}}</span>
          <el-button
            id="private-key-btn"
            :data-clipboard-text="app.keyDetail.privateKey"
            type="primary"
            size="mini"
          >复制</el-button>
        </div>
      </el-form-item>
      <el-form-item label="xAppCode:" prop="xAppCode">
        <el-input placeholder="请输入xAppCode" type="textarea" size="small" v-model="xAppCode"></el-input>
      </el-form-item>
      <el-form-item label="xRegCode:" prop="xRegCode">
        <el-input placeholder="请输入xRegCode" type="textarea" size="small" v-model="xRegCode"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button size="small" type="primary" @click="handleSubmit">保 存</el-button>
      <el-button size="small" @click="show = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
@import '@/style/el-dialog-rewrite.scss';
#app-key-dialog {
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
  }
}
</style>
