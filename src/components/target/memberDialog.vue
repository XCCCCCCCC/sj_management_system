<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        credit: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系人电话', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      member: state => state.target.member,
    }),
    type() {
      switch (this.member.type) {
        case 'detail':
          return '查看'
        case 'add':
          return '新增'
        case 'edit':
          return '编辑'
        default:
          return '查看'
      }
    },
    disabled() {
      return this.member.type === 'detail'
    },
    show: {
      get() {
        return this.member.showDialog
      },
      set(val) {
        this.updateShowDialog(val)
      },
    },
    name: {
      get() {
        return this.member.detail.name
      },
      set(val) {
        this.updateName(val)
      },
    },
    credit: {
      get() {
        return this.member.detail.credit
      },
      set(val) {
        this.updateCredit(val)
      },
    },
    contact: {
      get() {
        return this.member.detail.contact
      },
      set(val) {
        this.updateContact(val)
      },
    },
    phone: {
      get() {
        return this.member.detail.phone
      },
      set(val) {
        this.updatePhone(val)
      },
    },
    email: {
      get() {
        return this.member.detail.email
      },
      set(val) {
        this.updateEmail(val)
      },
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions('target/member', ['getList', 'getDetail', 'add', 'update']),
    ...mapMutations('target/member', ['updateShowDialog', 'updateName', 'updateCredit', 'updateContact', 'updatePhone', 'updateEmail', 'resetDetail']),
    handleSubmit() {
      this.$refs.memberForm.validate(valid => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async submit() {
      switch (this.member.type) {
        case 'add':
          await this.add()
          this.show = false
          break
        case 'edit':
          await this.update()
          this.show = false
          break
        default:
          await this.update()
          this.show = false
          break
      }
      this.getList()
    },
    closed() {
      this.resetDetail()
      this.$refs.memberForm.resetFields()
    },
  },
}
</script>

<template>
  <el-dialog
    @closed="closed"
    :title="`${type}xID映射服务成员`"
    :visible.sync="show"
    width="490px"
    append-to-body
  >
    <el-form
      size="small"
      :model="member.detail"
      :rules="rules"
      ref="memberForm"
      label-width="140px"
    >
      <el-form-item v-show="type!=='新增'" label="成员编号:">
        <span>{{member.detail.id}}</span>
      </el-form-item>
      <el-form-item label="机构名称:" prop="name">
        <el-input placeholder="请输入机构名称" :disabled="disabled" v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码:" prop="credit">
        <el-input placeholder="请输入统一社会信用代码" :disabled="disabled" v-model="credit"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="contact">
        <el-input placeholder="请输入联系人" :disabled="disabled" v-model="contact"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话:" prop="phone">
        <el-input placeholder="请输入联系人电话" :disabled="disabled" v-model="phone"></el-input>
      </el-form-item>
      <el-form-item label="联系人邮箱:" prop="email">
        <el-input placeholder="请输入联系人邮箱" :disabled="disabled" v-model="email"></el-input>
      </el-form-item>
    </el-form>
    <div v-if="!disabled" slot="footer" class="dialog-footer" align="center">
      <el-button size="small" type="primary" @click="handleSubmit">提 交</el-button>
      <el-button size="small" @click="show = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
@import '@/style/el-dialog-rewrite.scss';
</style>
