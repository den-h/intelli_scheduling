<template>

  <p style="margin: 30px 30px;font-size: 18px;font-weight: bold;color: #888888">个人信息</p>

  <Form ref="form" :model="form" :rules="rule" :label-width="80"
        style="width: 60%;margin: 30px auto">

    <FormItem label="姓名" prop="name">
      <Input v-model="form.name" placeholder="请输入姓名"></Input>
    </FormItem>

    <FormItem label="电子邮件" prop="email">
      <Input v-model="form.email" placeholder="请输入电子邮件"></Input>
    </FormItem>


    <FormItem label="密码" prop="password">
      <Input v-model="form.password" placeholder="请输入密码"></Input>
    </FormItem>


    <FormItem label="所属店铺" prop="storeid">
      <Select v-model="form.storeid" placeholder="选择所属店铺" disabled>
        <Option v-for="item in storelist" :value="item.storeid" :key="item.value">{{ item.name }}</Option>
      </Select>
    </FormItem>

    <FormItem label="职位" prop="position">
      <Select v-model="form.position" placeholder="选择职位" disabled>
        <Option :value=0>小组长</Option>
        <Option :value=1>收银员</Option>
        <Option :value=2>服务员</Option>
      </Select>
    </FormItem>

    <FormItem label="状态" prop="status" >
      <RadioGroup v-model="form.status">
        <Radio :label=1 disabled>启用</Radio>
        <Radio :label=0 disabled>禁用</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="时间偏好" >
      <Space size="large" wrap >
<!--        <TimePicker :model-value="form.timeprefer" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time"-->
<!--                    style="width: 168px" @on-change="show()"/>-->
        <TimePicker :model-value="form.timeprefer" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px" @on-change="show" />
      </Space>
      <InputNumber :max="5" :min="1" v-model="form.weight1" placeholder="权重" style="margin-left: 50px"/>
    </FormItem>


    <FormItem label="工作时长偏好" label-position="top">

      <InputNumber  v-model="form.durationprefer" placeholder="请输入数字" style="width: 100px"/>
      <span style="margin-left: 10px;color: #888888">小时</span>

      <InputNumber :max="5" :min="1" v-model="form.weight2" placeholder="权重" style="margin-left: 50px"/>


    </FormItem>


    <FormItem label="工作日偏好" label-position="top">
      <Space direction="" size="large">
        <CheckboxGroup v-model="form.dayprefer">
          <Checkbox :label=1 >周一</Checkbox>
          <Checkbox :label=2 >周二</Checkbox>
          <Checkbox :label=3 >周三</Checkbox>
          <Checkbox :label=4 >周四</Checkbox>
          <Checkbox :label=5 >周五</Checkbox>
          <Checkbox :label=6 >周六</Checkbox>
          <Checkbox :label=7 >周日</Checkbox>
        </CheckboxGroup>
        <InputNumber :max="5" :min="1" v-model="form.weight3" placeholder="权重" style="margin-left: 50px"/>
      </Space>

    </FormItem>


    <FormItem>
      <Button type="primary" @click="handleSubmit('form')" style="margin-right: 40px">添加</Button>
      <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
    </FormItem>


  </Form>
</template>
<script scoped>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: '的复古风',
        email: 'sdfds',
        password:'sdfsf',
        storeid: 1,
        status: 1,
        position: 1,
        timeprefer:[],
        durationprefer:null,
        dayprefer:[1,2,7],
        weight1:null,
        weight2:null,
        weight3:null
      },
      store:[],
      rule: {
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          // {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
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
          console.log(typeof this.form.durationprefer)
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
    },
    show(time){
      this.form.timeprefer=time
      console.log(time)
      console.log( this.form.timeprefer)
      console.log( typeof this.form.timeprefer)
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