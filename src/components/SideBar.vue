<template>
  <Row>
    <Col span="8">
      <Menu :theme="theme" width="200px">

        <Submenu name="1" style="height: 50px">
          <template #title>
            <Icon type="ios-paper" />
            店铺管理
          </template>
          <MenuItem name="1-1" style="height: 50px">文章管理</MenuItem>
          <MenuItem name="1-2" style="height: 50px">评论管理</MenuItem>
          <MenuItem name="1-3" style="height: 50px">举报管理</MenuItem>
        </Submenu>

        <Submenu name="2">
          <template #title>
            <Icon type="ios-people" />
            员工管理
          </template>
        </Submenu>

        <Submenu name="3">
          <template #title>
            <Icon type="ios-stats" />
            排班表
          </template>
        </Submenu>

        <Submenu name="4">
          <template #title>
            <Icon type="ios-people" />
            规则管理
          </template>
        </Submenu>

      </Menu>
    </Col>
  </Row>
  <br>
  <p>Change theme</p>
  <RadioGroup v-model="theme">
    <Radio label="light"></Radio>
    <Radio label="dark"></Radio>
  </RadioGroup>
</template>

<script>
export default {
  name: "SideBar",
  data () {
    return {
      theme: 'light'
    }
  }

}
</script>

<style scoped>

</style>