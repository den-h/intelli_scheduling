<template>
  <div>
    <p style="margin: 30px 30px;font-size: 18px;font-weight: bold;color: #888888">修改规则</p>

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width: 60%;margin: 0 auto">

      <FormItem label="店铺" prop="shop">
        <Select v-model="formValidate.shop" placeholder="选择店铺" style="width: 200px">
          <Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>

      <FormItem label="锁定" prop="size">
        <Switch v-model="value" style="margin-left: 10px;vertical-align: -6px" @on-change="change" size="large"  />
      </FormItem>

      <FormItem label="客流规则" prop="flow">
        <Input v-model="formValidate.flow" placeholder="请输入数字" type="number" style="width: 100px" :disabled="value"></Input> <span
          style="margin-left: 20px;color: #888888">按照业务预测数据，每多少个客流安排一个员工</span>
      </FormItem>


      <FormItem label="开店规则" prop="open1">
        <Input v-model="formValidate.open1" placeholder="请输入数字" type="number" style="width: 100px" :disabled="value"></Input> <span
          style="margin-left: 20px;color: #888888">开店多少小时前需要有员工值当</span><br>
      </FormItem>

      <FormItem label="" prop="open2">
        <Input v-model="formValidate.open2" placeholder="请输入数字" type="number" style="width: 100px" :disabled="value"></Input> <span
          style="margin-left: 20px;color: #888888">值当员工数为门店面积除以多少</span>
      </FormItem>


      <FormItem label="关店规则" prop="close1">
        <Input v-model="formValidate.close1" placeholder="请输入数字" type="number" style="width: 100px" :disabled="value"></Input> <span
          style="margin-left: 20px;color: #888888">关店多少小时内需要有员工值当</span><br>
      </FormItem>

      <FormItem label="" prop="close2">
        <Input v-model="formValidate.close2" placeholder="请输入数字" type="number" style="width: 100px" :disabled="value"></Input> <span
          style="margin-left: 20px;color: #888888">当值员工数不小于多少</span><br>
      </FormItem>

      <FormItem label="" prop="close3">
        <Input v-model="formValidate.close3" placeholder="请输入数字" type="number" style="width: 100px" :disabled="value"></Input> <span
          style="margin-left: 20px;color: #888888">当值员工数不小于门店面积除以多少</span>
      </FormItem>


      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')" :disabled="value">修改</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px" :disabled="value">重置</Button>
      </FormItem>

    </Form>

  </div>

</template>

<script scoped>
export default {
  name: "AlterRule",
  data () {
    return {
      shopList: [
        {
          value: '1',
          label: '一店'
        },
        {
          value: '2',
          label: '二店'
        },
        {
          value: '3',
          label: '三店'
        }
      ],
      value: true,
      formValidate: {
        shop: '',
        flow:null,
        open1:null,
        open2:null,
        close1:null,
        close2:null,
        close3:null

      },
      ruleValidate: {
        shop: [
          {required: true, message: '请选择店铺', trigger: 'blur'}
        ],
        flow: [
          {required: true, message: '客流规则不能为空', trigger: 'blur'}
        ],
        open1: [
          {required: true, message: '开店规则不能为空', trigger: 'blur'}
        ],
        open2: [
          {required: true, message: '开店规则不能为空', trigger: 'blur'}
        ],
        close1: [
          {required: true, message: '关店规则不能为空', trigger: 'blur'}
        ],
        close2: [
          {required: true, message: '关店规则不能为空', trigger: 'blur'}
        ],
        close3: [
          {required: true, message: '关店规则不能为空', trigger: 'blur'}
        ],
      }

    }
  },
  methods: {
    change (status) {
      if(status){
        this.$refs.state.textContent='锁定'
      }
      else{
        this.$refs.state.textContent='解锁'
      }
    },


    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },

    alterRequest(){

    }


  },
  watch:{

  },
  mounted() {

  }

}
</script>

<style scoped>

</style>