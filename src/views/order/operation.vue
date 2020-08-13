<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      rules: {
        origin: [{ required: true, message: '请输入源成员应用', trigger: 'change' }],
        target: [{ required: true, message: '请输入目的成员应用', trigger: 'change' }],
        use1: [{ required: true, message: '请选择调用方', trigger: 'change' }],
        use2: [{ required: true, message: '请选择调用方', trigger: 'change' }],
      },
    }
  },
  computed: {
    ...mapState({
      operation: state => state.order.operation,
    }),
    readOnly() {
      return this.operation.type === 'detail'
    },
    typeLabel() {
      switch (this.operation.type) {
        case 'add':
          return '新增'
        case 'update':
          return '编辑'
        case 'detail':
          return '查看'
        default:
          return '查看'
      }
    },
    origin: {
      get() {
        return this.operation.detail.origin
      },
      set(val) {
        this.updateOrigin(val)
      },
    },
    target: {
      get() {
        return this.operation.detail.target
      },
      set(val) {
        this.updateTarget(val)
      },
    },
    use1: {
      get() {
        return this.operation.detail.use1
      },
      set(val) {
        this.updateUse1(val)
      },
    },
    use2: {
      get() {
        return this.operation.detail.use2
      },
      set(val) {
        this.updateUse2(val)
      },
    },
  },
  watch: {},
  created() {
    if (!this.operation.type) {
      this.$router.push({ path: '/order/list' })
    }
  },
  mounted() {
    this.getAppList()
  },
  methods: {
    ...mapActions('order/operation', ['getAppList', 'add', 'update']),
    ...mapMutations('order/operation', ['updateOrigin', 'updateTarget', 'updateUse1', 'updateUse2']),
    handleSuccess() {},
    returnLabel(option) {
      return `${option.orgFullName}(${option.memberId} ${option.appId})`
    },
    handleSubmit() {
      this.$refs.orderForm.validate(valid => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async submit() {
      if (this.operation.type === 'add') {
        await this.add()
      } else if (this.operation.type === 'update') {
        await this.update()
      }
      this.show = false
      this.$router.push({ path: '/order/list' })
    },
  },
}
</script>

<template>
  <div id="order-operation">
    <div class="top-wrapper">
      <div>{{typeLabel}}xID映射服务</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/order/list' }">xID映射服务列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{typeLabel}}xID映射服务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form
      size="small"
      ref="orderForm"
      :model="operation.detail"
      :rules="rules"
      label-width="120px"
    >
      <div class="categroy">
        <el-form-item label="源成员应用:" prop="origin">
          <el-select
            :disabled="readOnly"
            filterable
            v-model="origin"
            placeholder="请选择源成员应用"
            style="width: 100%;"
          >
            <el-option
              v-for="option in operation.appList"
              :key="option.id"
              :label="returnLabel(option)"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目的成员应用:" prop="target">
          <el-select
            :disabled="readOnly"
            filterable
            v-model="target"
            placeholder="请选择目的成员应用"
            style="width: 100%;"
          >
            <el-option
              v-for="option in operation.appList"
              :key="option.id"
              :label="returnLabel(option)"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务调用方:" prop="use1">
          <el-select
            :disabled="readOnly"
            multiple
            filterable
            v-model="use1"
            placeholder="请选择服务调用方"
            style="width: 100%;"
          >
            <el-option
              v-for="option in operation.appList"
              :key="option.id"
              :label="returnLabel(option)"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务分中心:">
          <el-input disabled :value="operation.detail.no"></el-input>
        </el-form-item>
        <el-form-item label="ID类型:">
          <el-input disabled :value="operation.detail.type"></el-input>
        </el-form-item>
        <el-form-item label="服务上限(次):">
          <el-input disabled :value="operation.detail.limit"></el-input>
        </el-form-item>
      </div>
      <div class="categroy">
        <el-form-item label="源成员应用:">
          <el-select
            disabled
            filterable
            v-model="target"
            placeholder="请选择源成员应用"
            style="width: 100%;"
          >
            <el-option
              v-for="option in operation.appList"
              :key="option.id"
              :label="returnLabel(option)"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目的成员应用:">
          <el-select
            disabled
            filterable
            v-model="origin"
            placeholder="请选择目的成员应用"
            style="width: 100%;"
          >
            <el-option
              v-for="option in operation.appList"
              :key="option.id"
              :label="returnLabel(option)"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务调用方:" prop="use2">
          <el-select
            :disabled="readOnly"
            multiple
            filterable
            v-model="use2"
            placeholder="请选择服务调用方"
            style="width: 100%;"
          >
            <el-option
              v-for="option in operation.appList"
              :key="option.id"
              :label="returnLabel(option)"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务分中心:">
          <el-input disabled :value="operation.detail.no"></el-input>
        </el-form-item>
        <el-form-item label="ID类型:">
          <el-input disabled :value="operation.detail.type"></el-input>
        </el-form-item>
        <el-form-item label="服务上限(次):">
          <el-input disabled :value="operation.detail.limit"></el-input>
        </el-form-item>
      </div>
      <div class="categroy">
        <el-form-item class="upload-form-item" label="业务合规备案表:">
          <el-upload action :limit="1" :on-success="handleSuccess" :file-list="operation.fileList">
            <el-button disabled type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">仅支持上传doc / pdf格式</div>
          </el-upload>
        </el-form-item>
      </div>
      <div class="control-wrapper">
        <el-button size="small" type="primary" @click="handleSubmit">保存</el-button>
        <el-button size="small" @click="$router.push({path: '/order/list'})">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss">
#order-operation {
  .top-wrapper {
    margin-bottom: 20px;
    // padding: 0 0 0 20px;
    text-align: left;
    > div {
      margin-bottom: 10px;
    }
    // @include flex-center(y);
    // justify-content: space-between;
  }
  .categroy {
    // &:not(:last-child) {
    //   margin-bottom: 20px;
    // }
    margin-bottom: 20px;
    padding: 25px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12);
    background-color: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    .el-form-item {
      .el-form-item__content {
        width: 340px;
      }
    }
    .upload-form-item {
      text-align: left;
    }
  }
  .control-wrapper {
    text-align: left;
    .el-button {
      width: 80px;
    }
  }
}
</style>
