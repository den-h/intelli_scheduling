<template>

  <p style="margin: 30px 30px;font-size: 18px;font-weight: bold;color: #888888">添加员工</p>

  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80"
        style="width: 60%;margin: 30px auto">

    <FormItem label="姓名" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
    </FormItem>

    <FormItem label="电子邮件" prop="email">
      <Input v-model="formValidate.email" placeholder="请输入电子邮件"></Input>
    </FormItem>

    <FormItem label="所属店铺" prop="storeid">
      <Select v-model="formValidate.storeid" placeholder="选择所属店铺">
        <Option v-for="item in storelist" :value="item.storeid" :key="item.value">{{ item.name }}</Option>
      </Select>
    </FormItem>

    <FormItem label="职位" prop="position">
      <Select v-model="formValidate.position" placeholder="选择职位">
        <Option :value=0>小组长</Option>
        <Option :value=1>收银员</Option>
        <Option :value=2>服务员</Option>
      </Select>
    </FormItem>

    <FormItem label="状态" prop="status">
      <RadioGroup v-model="formValidate.status">
        <Radio :label=1>启用</Radio>
        <Radio :label=0>禁用</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')" style="margin-right: 40px">添加</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>


  </Form>
</template>
<script>

import axios from "axios";

export default {
  data() {
    return {
      formValidate: {
        name: '',
        email: '',
        storeid: null,
        status: null,
        position: null,
      },
      store:[],
      ruleValidate: {
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          // {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        storeid: [
          {required: true, message: '请选择所属店铺', trigger: 'change',type:'number'}
        ],
        position: [
          {required: true, message: '请选择职位', trigger: 'change',type:'number'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'change',type:'number'}
        ]
      },
      storelist:[]
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          axios.post('/api/admin',
              this.formValidate
          ).then(res => {
            if (res.data.code == 1) {
              this.$Message.success('添加成功')
              this.formValidate = {}
              this.$router.push('/allstuff')
            } else {
              this.$Message.error('添加失败')
            }
          }).catch(() => {
            this.$Message.error('添加失败')
          })
        } else {
          console.log(this.formValidate)
          this.$Message.error('添加失败!');
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    axios.get('/api/admin/store')
    .then(res=>{
      if(res.data.code==1){
        this.storelist=res.data.data
      }
    }).catch(err=>{
      console.log(err)
    })

  },
  created() {
  }
}
</script>

<style scoped>

</style>