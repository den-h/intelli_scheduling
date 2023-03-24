<template>
  <Space direction="wrap" size="large" type="flex" >
    <Input search enter-button placeholder="请输入员工名" style="width: 500px" />
    <Button type="primary" style="margin-left: 100px" @click="modal = true">添加员工</Button>
  </Space>


  <Modal
      v-model="modal"
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel">
    <p>Content of dialog</p>
    <p>Content of dialog</p>
    <p>Content of dialog</p>
  </Modal>


</template>

<script>
export default {
  name: "StuffView",
  data () {
    return {
      modal: false
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok');
    },
    cancel () {
      this.$Message.info('Clicked cancel');
    }
  }

}
</script>

<style scoped>

</style>