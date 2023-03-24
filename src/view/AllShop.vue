<template>

<!--  店铺表-->
  <Table border :columns="columns" :data="data" max-height="520"  >
    <template #name="{ row }">
      <strong>{{ row.name }}</strong>
    </template>
    <template #action="{ index}">
      <Button type="error" size="small" style="margin-right: 5px"  @click="modal=true;this.index=index">删除</Button>
      <Button type="primary" size="small"  @click="value = true">修改</Button>
    </template>
  </Table>

<!--修改抽屉-->
  <Drawer
      title="修改信息"
      v-model="value"
      width="720"
      :mask-closable="false"
      :styles="styles"
  >
    <Form :model="formData">

      <Row :gutter="32">
        <Col span="12">
          <FormItem label="店名" label-position="top">
            <Input v-model="formData.name" placeholder="" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="面积" label-position="top">
            <Input v-model="formData.size" placeholder="please enter url">
            </Input>

          </FormItem>
        </Col>
      </Row>

      <Row :gutter="32">
        <Col span="12">
          <FormItem label="地址" label-position="top">
            <Input v-model="formData.address" placeholder="" />
          </FormItem>
        </Col>
      </Row>


    </Form>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="value = false">取消</Button>
      <Button type="primary" @click="revise">修改</Button>
    </div>
  </Drawer>

<!-- 删除 -->
  <Modal
      v-model="modal"
      title="⚠️警告"
      @on-ok="ok"
      @on-cancel="cancel">
    <p>确定删除吗？</p>
  </Modal>

</template>

<script>
export default {
  name: "AllShop",
  data () {
    return {
      //店铺表
      columns: [
        {
          title: '店名',
          slot: 'name',
          width: 200
        },
        {
          title: '面积',
          key: 'size',
          width: 200
        },
        {
          title: '地址',
          key: 'address',
        },
        {
          title: '操作',
          slot: 'action',
          width:150,
          align: 'center'
        }
      ],
      data: [
        {
          name: '白金瀚',
          size: 100,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 100,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 100,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 100,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 100,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 100,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 100,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 100,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 100,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 400,
          address: '湖南省长沙市天心区长沙理工大学'
        },
        {
          name: '白金瀚',
          size: 200,
          address: '湖南省长沙市天心区长沙理工大学'
        },
      ],

      //修改
      value: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },

      //修改
      formData: {
        name: '',
        size: '',
        address: ''
      },

      //删除
      modal: false,
      index:null


    }
  },
  methods: {
    revise(){
      this.value=false
    },
    deleteshop(index){
    //删除接口
      console.log(index)
    },
    ok () {
      this.deleteshop(this.index);
    },
    cancel () {
      this.$Message.info('已取消');
    },
  }
}
</script>

<style scoped>
.demo-drawer-footer{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>