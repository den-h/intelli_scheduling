<template>
  <div class="layout">
    <Layout style="height: 100vh">

      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div>
            <span style="color: white;text-align: center;vertical-align: middle;font-size: 16px">智能排班系统</span>
            <span style="display: inline-block;float: right;color: white;margin-right: 100px;font-size: 16px">你好，{{name}}</span>

          </div>

        </Menu>
      </Header>


      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">

            <Submenu name="1">
              <template #title>
                <Icon type="ios-navigate"></Icon>
                店铺管理
              </template>
              <MenuItem name="1-1" to="layout">店铺信息</MenuItem>
              <MenuItem name="1-2" to="addshop"> 添加店铺</MenuItem>
            </Submenu>

            <Submenu name="2">
              <template #title>
                <Icon type="ios-keypad"></Icon>
                员工管理
              </template>
              <MenuItem name="2-1" to="allstuff">员工信息</MenuItem>
              <MenuItem name="2-2" to="addstuff">添加员工</MenuItem>

            </Submenu>

            <Submenu name="3">
              <template #title>
                <Icon type="ios-analytics"></Icon>
                排班表
              </template>
              <MenuItem name="3-1">排班表</MenuItem>
            </Submenu>

            <Submenu name="4">
              <template #title>
                <Icon type="ios-analytics"></Icon>
                规则管理
              </template>
              <MenuItem name="3-1" to="alterrule">修改规则</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">


          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>

export default {
  name: "LayOut",
  data() {
    return {
      name:'dvcd'
    }


  },
  methods: {

  },
  mounted() {
    this.name=this.$route.query.name

  }
}
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}


</style>