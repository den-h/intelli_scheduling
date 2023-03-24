<template>

  <!--  查询按钮-->
  <Space direction="wrap" size="large" type="flex" style="margin-top: 10px;min-width: 1000px;overflow: hidden">
    <Input search enter-button placeholder="请输入员工名" v-model="model0" style="width: 250px;margin-right: 30px"
           @click="initTable" @keyup="initTable"/>

    <Select v-model="model1" style="width:200px" @change="initTable">
      <Option v-for="item in shop" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>


    <Select v-model="model2" style="width:200px" @change="initTable">
      <Option v-for="item in position" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

    <Select v-model="model3" style="width:200px" @change="initTable">
      <Option v-for="item in unchange" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

    <Button type="error"  ref="del" style="position: absolute;right: 100px;display: none" @click="this.modal=true">删除</Button>

    <Button type="warning" ref="can" style="position: absolute;right: 100px;display:none" @click="showNone">取消</Button>

    <Button type="primary" ref="opt" style="position: absolute;right: 100px;display: block" @click="showMore">多选</Button>

  </Space>

  <!--  员工信息表-->
  <Table width="100%" border :columns="columns" :data="data" style="margin-top: 30px"  max-height="520"
         ref="selection" @on-select="deleteMore" @on-select-all="deleteMore" @on-select-cancel="deleteMore"
         @on-select-all-cancel="deleteMore"></Table>


  <Modal
      v-model="modal"
      title="⚠️警告"
      @on-ok="ok"
      @on-cancel="cancel">
    <p>确定删除吗？</p>
  </Modal>

  <!-- 修改抽屉 -->

  <Drawer
      title="修改信息"
      v-model="value"
      width="720"
      :mask-closable="false"
      :styles="styles"
  >
    <Form :model="formData">

      <!-- 姓名和电子邮箱-->
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="姓名" label-position="top">
            <Input v-model="formData.name" placeholder="ple" disabled/>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="电子邮箱" label-position="top">
            <Input v-model="formData.email" placeholder="please enter url" disabled>
            </Input>
          </FormItem>
        </Col>

      </Row>

      <!--      ID和密码-->
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="ID" label-position="top">
            <Input v-model="formData.id" placeholder="ple" disabled/>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="密码" label-position="top">
            <Input v-model="formData.password" placeholder="please enter url" disabled>
            </Input>
          </FormItem>
        </Col>

      </Row>


      <!--   店铺和职位   -->
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="所属店铺" label-position="top">
            <Select v-model="formData.storeid" placeholder="please choose the approver">
              <Option v-for="item in shopdrew" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="职位" label-position="top">
            <Select v-model="formData.position" placeholder="please choose the approver">
              <Option :value=0>小组长</Option>
              <Option :value=1>收银员</Option>
              <Option :value=2>服务员</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>


      <!--状态和排班情况-->
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="状态" label-position="top">

            <RadioGroup v-model="formData.status">
              <Radio :label=1>启用</Radio>
              <Radio :label=0>未启用</Radio>
            </RadioGroup>


          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="排班情况" label-position="top">

            <RadioGroup v-model="formData.isDelete">
              <Radio :label=0>已排班</Radio>
              <Radio :label=1>未排班</Radio>
            </RadioGroup>

          </FormItem>
        </Col>
      </Row>

      <!--      工作时长和工作时间偏好-->
      <Row :gutter="32">

        <Col span="12">
          <FormItem label="工作时间偏好" label-position="top">
            <Space size="large" wrap v-model="formData.timeprefer">
              <TimePicker format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time"
                          style="width: 168px" disabled/>
            </Space>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="工作时长偏好" label-position="top">
            <InputNumber :max="10" :min="1" v-model="formData.durationprefer" style="margin-right: 10px" disabled/>
            小时
          </FormItem>
        </Col>

      </Row>


      <!--工作日偏好-->
      <FormItem label="工作日偏好" label-position="top">

        <Space direction="vertical" size="large">
          <CheckboxGroup v-model="formData.dayprefer">
            <Checkbox label="mon" disabled>周一</Checkbox>
            <Checkbox label="tus" disabled>周二</Checkbox>
            <Checkbox label="wed" disabled>周三</Checkbox>
            <Checkbox label="thu" disabled>周四</Checkbox>
            <Checkbox label="fri" disabled>周五</Checkbox>
            <Checkbox label="sat" disabled>周六</Checkbox>
            <Checkbox label="sun" disabled>周日</Checkbox>
          </CheckboxGroup>
        </Space>

      </FormItem>


    </Form>

    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="cancelre">取消</Button>
      <Button type="primary" @click="revise">修改</Button>
    </div>


  </Drawer>


  <!--  分页-->
  <Page :total="total" style="position: absolute;bottom:30px;left: 50%" :page-size="pageSize" v-model="current"/>


</template>

<script>
import {resolveComponent} from 'vue'
import axios from "axios";


export default {
  name: "AllStuff",
  data() {
    return {

      //顶端按钮数据
      modal: false,
      shop: [
        {
          value: null,
          label: '全部'
        }
      ],
      position: [
        {
          value: null,
          label: '全部'
        },
        {
          value: 0,
          label: '小组长'
        },
        {
          value: 1,
          label: '收银员'
        },
        {
          value: 2,
          label: '服务员'
        }
      ],
      unchange: [
        {
          value: null,
          label: '全部'
        },
        {
          value: 0,
          label: '仅显示不可修改删除'
        },
        {
          value: 1,
          label: '仅显示可修改删除'
        }
      ],
      model0: '',
      model1: null,
      model2: null,
      model3: null,

      //员工表数据
      columns: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center',
        //   fixed: "left",
        // },
        {
          title: '姓名',
          key: 'name',
          width: 100,
          fixed: 'left'
        },
        {
          title: 'ID',
          key: 'id',
          width: 100,
        },
        {
          title: '状态',
          key: 'status',
          width: 100
        },
        {
          title: '排班状态',
          key: 'scheduling',
          width: 100
        },
        {
          title: '电子邮件',
          key: 'email',
          width: 200
        },
        {
          title: '密码',
          key: 'password',
          width: 200
        },
        {
          title: '所属店铺',
          key: 'shop',
          width: 200
        },
        {
          title: '职位',
          key: 'position',
          width: 100
        },
        {
          title: '工作日偏好',
          key: 'dayprefer',
          width: 200
        },
        {
          title: '工作时长偏好',
          key: 'timeprefer',
          width: 200
        },
        {
          title: '班次时长偏好',
          key: 'durationprefer',
          width: 200
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 160,
          // eslint-disable-next-line no-unused-vars
          render: (h, params) => {
            return h('div', [
              h(resolveComponent('Button'), {
                type: 'error',
                size: 'small',
                style: {
                  marginRight: '5px'
                },
                onclick: () => {
                  this.modal = true
                  this.flag = 0
                  this.deleteid = params.row.id
                }
              }, {
                default() {
                  return '删除'
                }
              }),
              h(resolveComponent('Button'), {
                type: 'primary',
                size: 'small',
                onclick: () => {
                  this.value = true
                  console.log(params.row)
                  this.formData.name = params.row.name
                  this.formData.email = params.row.email
                  this.formData.password = params.row.password
                  this.formData.id = params.row.id
                  this.formData.storeid = params.row.storeid

                  if (params.row.position == '小组长') {
                    this.formData.position = 0
                  } else if (params.row.position == '收银员') {
                    this.formData.position = 1
                  } else {
                    this.formData.position = 2
                  }

                  if (params.row.status == '启用') {
                    this.formData.status = 1
                  } else {
                    this.formData.status = 0
                  }

                  if (params.row.scheduling == '已排班') {
                    this.formData.isDelete = 0
                  } else {
                    this.formData.isDelete = 1
                  }

                  this.formData.name = params.row.name
                  this.formData.name = params.row.name
                  this.formData.name = params.row.name
                }
              }, {
                default() {
                  return '修改'
                }
              })
            ]);
          }
        }
      ],
      data: [
        {
          name: 'John Brown',
          id: '1',
          status: '启用',
          scheduling: '已排班',
          email: '243430029@qq.com',
          password: 'Jb123456',
          shop: '1店',
          position: '服务员',
          dayprefer: '周六',
          timeprefer: '9:00~11:00',
          durationprefer: '8小时',
        }
      ],
      shoplist: [],
      deleteid: '',


      //抽屉数据
      value: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        name: '',
        id: '',
        status: null,
        isDelete: null,
        email: '',
        password: '',
        storeid: null,
        position: null,
        dayprefer: '',
        timeprefer: '',
        durationprefer: ''
      },
      shopdrew: [],

      //分页数据
      total: 100,
      pageSize: 10,
      current: 1,


      //批量删除
      deleteArray: [],
      flag: 0,
      times:0

    }


  },
  methods: {

    //删除函数
    delete(id) {
      axios.delete('/api/admin/' + id
      ).then((res) => {
        if (res.data.code == 1) {
          this.$Message.success('删除成功')
          this.initTable()
        }
      }).catch((err) => {
        console.log(err)
        this.$Message.error('删除失败')
      })
    },
    ok() {
      if (!this.flag) {
        this.delete(this.deleteid)
      } else this.multipleDelete()
    },
    cancel() {
      this.$refs.selection.selectAll(false);
      this.$Message.info('已取消');
    },


    //批量删除
    deleteMore(selection) {
      if(selection.length>0) {
        this.$refs.opt.$el.style.display = "none"
        this.$refs.can.$el.style.display = "none"
        this.$refs.del.$el.style.display = "block"
      }else{
        this.$refs.opt.$el.style.display = "none"
        this.$refs.can.$el.style.display = "block"
        this.$refs.del.$el.style.display = "none"
      }

      this.flag = 1
      this.deleteArray.length = selection.length
      for (let i = 0; i < selection.length; i++) {
        this.deleteArray[i] = selection[i].id
      }
      console.log(this.deleteArray)
      console.log(this.deleteArray[0])
      console.log(selection)
    },

    showMore() {
      if(this.times==0) {
        this.columns.unshift({
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: "left"
        })
        this.times=1
      }
      this.$refs.opt.$el.style.display="none"
      this.$refs.can.$el.style.display="block"
    },

    showNone(){
      if(this.times==1){
        this.columns.shift()
        this.times=0
        this.$refs.opt.$el.style.display="block"
        this.$refs.can.$el.style.display="none"
      }
    },


    multipleDelete() {
      this.columns.shift()
      this.times=0
      this.$refs.opt.$el.style.display="block"
      this.$refs.can.$el.style.display="none"
      this.$refs.del.$el.style.display="none"

      axios({
            url: '/api/admin',
            method: 'delete',
            data: this.deleteArray
          }
      ).then(res => {
        if (res.data.code == 1) {
          this.$Message.success('删除成功')
          this.initTable()
          this.deleteArray = []
        } else {
          this.$Message.error('删除失败')
        }
      }).catch(err => {
        this.$Message.error('删除失败')
        console.log(err)
      })
    },


    //修改函数
    revise() {
      axios.put('/api/admin',
          this.formData
      ).then(res => {
        if (res.data.code == 1) {
          this.$Message.success('修改成功')
          this.value = false
          this.formData = {}
          this.initTable()
          //  初始化员工表
        }
      }).catch(() => {
        this.$Message.error('修改失败')
      })
    },

    cancelre() {
      this.value = false
    },


    //初始化员工表
    initTable() {
      axios.post('/api/admin/' + this.current + '/' + this.pageSize, {
        position: this.model2,
        name: this.model0,
        storeid: this.model1,
        isDelete: this.model3
      }).then(res => {
        if (res.data.code == 1) {
          this.total = res.data.data.total
          this.data = res.data.data.records
          this.shoplist = res.data.map.store

          for (let i = 0; i < res.data.data.records.length; i++) {
            if (res.data.data.records[i].position == 0) {
              this.data[i].position = '小组长'
            } else if (res.data.data.records[i].position == 1) {
              this.data[i].position = '收银员'
            } else {
              this.data[i].position = '服务员'
            }

            if (res.data.data.records[i].isDelete == 0) {
              this.data[i].scheduling = "已排班"
            } else {
              this.data[i].scheduling = "未排班"
            }


            if (res.data.data.records[i].status == 1) {
              this.data[i].status = "启用"
            } else {
              this.data[i].status = "未启用"
            }

          }


          for (let i = 0; i < res.data.data.records.length; i++) {
            for (let j = 0; j < this.shoplist.length; j++) {
              if (res.data.data.records[i].storeid == this.shoplist[j].storeid) {
                this.data[i].shop = this.shoplist[j].name
                continue
              }
            }
          }


          let store = [{
            value: null,
            label: '全部'
          }]
          let store2 = []
          for (let i = 0; i < this.shoplist.length; i++) {
            store.push({
              value: this.shoplist[i].storeid,
              label: this.shoplist[i].name
            })
            store2.push({
              value: this.shoplist[i].storeid,
              label: this.shoplist[i].name
            })
          }
          this.shop = store
          this.shopdrew = store2


        }
      }).catch(error => {
        console.log(error)
      })
    },


  },
  watch: {
    current: {
      immediate: true,//立刻监视(初始化监视)
      handler() {
        this.initTable(this.current, this.pageSize)
      }
    },
    model1: {
      immediate: true,//立刻监视(初始化监视)
      handler() {
        this.initTable()
      }
    },
    model2: {
      immediate: true,//立刻监视(初始化监视)
      handler() {
        this.initTable()
      }
    },
    model3: {
      immediate: true,//立刻监视(初始化监视)
      handler() {
        this.initTable()
      }
    },

  },
  mounted() {
    this.initTable()


  }

}
</script>

<style scoped>

.demo-drawer-footer {
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