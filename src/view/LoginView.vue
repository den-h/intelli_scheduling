<template>
  <div class="container">

    <div class="login">
      <div class="left">
        <img src="../assets/hrattendanceschedule.png" alt="">
        <p>智能排班系统</p>
        <img src="../assets/shuju9.png" alt="">
      </div>

      <div class="right">
        <span>用户登录</span>
        <span>USER LOGIN</span>


        <!--登录表单+图形验证码-->
        <div class="demo-login">
          <Login @on-submit="handleSubmit">
            <UserName name="username" class="username" ref="u"/>
            <Password name="password" class="password"/>

            <Select v-model="model" style="width:400px;height: 60px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>


            <Captcha class="demo-login-captcha" name="captcha" :count-down="0">

              <template #text>

                <canvas id="canvas" width="128" height="40" @click="verificationCode"
                        style="border-radius: 3px;margin-left: -15px">

                </canvas>

              </template>

            </Captcha>


            <Submit/>

          </Login>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "LoginView",

  data() {
    return {
      code: '',
      cityList: [
        {
          value: 1,
          label: '店长'
        },
        {
          value: 0,
          label: '员工'
        }
      ],
      model: null,
      username: '',
      password: ''
    }
  },
  inject: [
    'reload'
  ],
  methods: {
    handleSubmit(valid, {username, password, captcha}) {
      console.log(this.code)
      this.password = password
      this.username = username

      if (this.code == captcha) {
        this.code = ''
        this.loginRequest();
      } else {
        this.$Message.error('验证码错误')
        this.code = ''
        this.reload()
      }
    },
    verificationCode() {
      this.code=''
      //	随机数生成函数
      function rn(min, max) {
        return parseInt(Math.random() * (max - min) + min)
      }

      //	随机生成颜色的函数
      function rc(min, max) {
        var r = rn(min, max)
        var g = rn(min, max)
        var b = rn(min, max)
        var str = 'rgb(' + r + ", " + g + ', ' + b + ")"
        return str
      }

      var w = 126
      var h = 38
      var canvas = document.querySelector('#canvas')
      var ctx = canvas.getContext('2d')
      // 在canvas上绘制背景颜色
      ctx.fillStyle = rc(180, 230)
      ctx.fillRect(0, 0, w, h)

      //  随机字符串
      var pool = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ1234567890'
      for (var i = 0; i < 4; i++) {
        //	取出随机的字母或数字
        var c = pool[rn(0, pool.length)]
        // 	随机出字体大小
        var fs = rn(14, 30)
        // 随机字符旋转角度
        var deg = rn(-30, 30)
        ctx.font = fs + 'px Simhei'
        ctx.textBaseline = 'top'
        // 设置字体填充颜色
        ctx.fillStyle = rc(80, 150)
        ctx.save()
        ctx.translate(30 * i + 15, 15)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(c, -10, -10)
        ctx.restore()
        this.code = this.code + c
      }

      // 随机生成5条干扰线
      for (var j = 0; j < 5; j++) {
        ctx.beginPath()
        ctx.moveTo(rn(0, w), rn(0, h))
        ctx.lineTo(rn(0, w), rn(0, h))
        ctx.strokeStyle = rc(180, 230)
        ctx.closePath()
        ctx.stroke()
      }
      // 随机生成40个干扰点
      for (var k = 0; k < 40; k++) {
        ctx.beginPath()
        ctx.arc(rn(0, w), rn(0, h), 1, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = rc(150, 200)
        ctx.fill()
      }
    },
    loginRequest() {
      axios.post('/api/admin/login', {
        email: this.username,
        password: this.password,
        position: this.model
      }).then((res) => {
        if (res.data.code == 1) {
          this.$Message.success('登录成功');
          if(this.model){
            this.$router.replace({
              path:'/layout',
              query: {
                name:this.username
              }
            });
          }
          else {
            this.$router.replace({
              path:'/layouts',
              query: {
                name:this.username
              }
            });
          }
        } else {
          console.log(res)
          this.$Message.error('账号或密码错误')
          this.reload()
        }
      }).catch((error) => {
        console.log(error)
        this.$Message.error('账号或密码错误');
        this.reload()
      })
    }
  },
  mounted() {
    this.verificationCode()
  }
}
</script>

<style scoped>
.container {
  background-color: #3F9EFF;
  width: 100%;
  height: 100vh;
}

.login {
  width: 55%;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  min-width: 600px;
}

.left {
  width: 40%;
  background-color: #EDF5FE;
  height: 500px;
  border-radius: 5px 0 0 5px;
  float: left;
  text-align: center;
  min-width: 200px;
}

.left img {
  width: 100px;
  height: 100px;
  margin-top: 20px;


}

.left img:last-child {

  width: 170px;
  height: 170px;
  margin-top: 50px;
}

.left p {
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
  color: #5e5e5e;
  letter-spacing: 1px;
  font-weight: bold;
}

.right {
  text-align: left;
  float: left;
  width: 60%;
  height: 500px;
  padding-left: 40px;
  overflow: hidden;
}

.right span {
  display: inline-block;
  margin-top: 40px;
}

.right span:first-child {
  color: #5e5e5e;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

.right span:last-child {
  color: #888888;
  font-weight: bold;
}

.demo-login {
  width: 400px !important;
  margin: 0 auto;
}

.demo-login-captcha .ivu-btn {
  padding: 0;
}

.demo-login-captcha .ivu-btn img {
  height: 28px;
  position: relative;
  top: 4px;
}

.demo-login {
  margin-top: 30px;
}


</style>