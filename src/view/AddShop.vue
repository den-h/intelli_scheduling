<template>
  <p style="margin: 30px 30px;font-size: 18px;font-weight: bold;color: #888888">添加店铺</p>


  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80"
        style="width: 60%;margin: 0 auto">
    <FormItem label="店名" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入店名"></Input>
    </FormItem>

    <FormItem label="面积" prop="size">
      <Input v-model="formValidate.size" placeholder="请输入门店面积" type="number"></Input>
    </FormItem>

    <FormItem label="地址" prop="address">
      <Input v-model="formValidate.address" placeholder="请输入门店地址"></Input>
    </FormItem>

    <FormItem label="客流规则" prop="flow">
      <!--      <Input v-model="formValidate.flow" placeholder="请输入数字" type="number" style="width: 100px"></Input> <span-->
      <!--        style="margin-left: 20px;color: #888888">按照业务预测数据，每多少个客流安排一个员工</span>-->

      <InputNumber v-model="formValidate.flow" placeholder="请输入数字" style="width: 100px"/>
      <span style="margin-left: 20px;color: #888888">按照业务预测数据，每多少个客流安排一个员工</span>

    </FormItem>


    <FormItem label="开店规则" prop="open1">

      <InputNumber v-model="formValidate.open1" placeholder="请输入数字" style="width: 100px"/>
      <span style="margin-left: 20px;color: #888888">开店多少小时前需要有员工值当</span>

    </FormItem>

    <FormItem label="" prop="open2">

      <InputNumber v-model="formValidate.open2" placeholder="请输入数字" style="width: 100px"/>
      <span style="margin-left: 20px;color: #888888">值当员工数为门店面积除以多少</span>

    </FormItem>


    <FormItem label="关店规则" prop="close1">

      <InputNumber v-model="formValidate.close1" placeholder="请输入数字" style="width: 100px"/>
      <span style="margin-left: 20px;color: #888888">关店多少小时内需要有员工值当</span>

    </FormItem>

    <FormItem label="" prop="close2">

      <InputNumber v-model="formValidate.close2" placeholder="请输入数字" style="width: 100px"/>
      <span style="margin-left: 20px;color: #888888">当值员工数不小于多少</span>

    </FormItem>

    <FormItem label="" prop="close3">

      <InputNumber v-model="formValidate.close3" placeholder="请输入数字" style="width: 100px"/>
      <span style="margin-left: 20px;color: #888888">当值员工数不小于门店面积除以多少</span>

    </FormItem>


    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>


  </Form>

</template>

<script>
export default {
  name: "AddShop",
  data() {
    return {
      formValidate: {
        name: '',
        size: '',
        address: '',
        flow: null,
        open1: null,
        open2: null,
        close1: null,
        close2: null,
        close3: null
      },

      ruleValidate: {
        name: [
          {required: true, message: '店名不能为空', trigger: 'blur'}
        ],
        size: [
          {required: true, message: '门店面积不能为空', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '门店地址不能为空', trigger: 'blur'}
        ],
        flow: [
          {required: true, message: '客流规则不能为空', trigger: 'blur', type: 'number'}
        ],
        open1: [
          {required: true, message: '不能为空', trigger: 'blur', type: 'number'}
        ],
        open2: [
          {required: true, message: '不能为空', trigger: 'blur', type: 'number'}
        ],
        close1: [
          {required: true, message: '不能为空', trigger: 'blur', type: 'number'}
        ],
        close2: [
          {required: true, message: '不能为空', trigger: 'blur', type: 'number'}
        ],
        close3: [
          {required: true, message: '不能为空', trigger: 'blur', type: 'number'}
        ],
      },


    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(typeof this.formValidate.close1)
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
}

</script>

<style scoped>

</style>