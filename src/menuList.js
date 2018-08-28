const auth = require('./libs/chmod');

module.exports = {
  menu :[
    {
      name : 'index',
      title : '首页',
      auth : 63
    },
    {
      name : 'flow',
      title : '流程管理',
      auth : 7,
      showChildren : true,
      children : [
        {
          name : 'list',
          title : '流程列表',
          auth : auth.goodsList|auth.goodsEdit
        },
        {
          name : 'edit',
          title : '新增流程',
          auth : auth.goodsList|auth.goodsEdit
        }
      ]
    },
    {
      name : 'line',
      title : '产线管理',
      auth : 7,
      showChildren : true,
      children : [
        {
          name : 'list',
          title : '产线列表',
          auth : auth.goodsList|auth.goodsEdit
        },
        {
          name : 'edit',
          title : '新增产线',
          auth : auth.goodsList|auth.goodsEdit
        }
      ]
    },
    {
      name : 'goods',
      title : '物料管理',
      auth : 56,
      showChildren : true,
      children : [
        {
          name : 'list',
          title : '物料列表',
          auth : auth.orderList
        },
        {
          name : 'list/list1',
          title : '成品物料',
          auth : auth.orderList
        },
        {
          name : 'list/list2',
          title : '原材料',
          auth : auth.orderList
        },
        {
          name : 'edit',
          title : '添加物料',
          auth : auth.orderList
        }
      ]
    },
    {
      name : 'task',
      title : '工单管理',
      auth : 56,
      showChildren : true,
      children : [
        {
          name : 'list',
          title : '工单列表',
          auth : auth.processAdd
        },
        {
          name : 'list/status/1',
          title : '生产中的工单',
          auth : auth.processAdd
        },
        {
          name : 'list/status/0',
          title : '计划中的工单',
          auth : auth.processAdd
        },
        {
          name : 'edit',
          title : '添加工单',
          auth : auth.processAdd
        }
      ]
    },
    {
      name : 'order',
      title : '订单管理',
      auth : 56,
      showChildren : true,
      children : [
        {
          name : 'list',
          title : '订单列表',
          auth : auth.orderList
        },
        {
          name : 'edit',
          title : '添加订单',
          auth : auth.orderList
        },
      ]
    },
    {
      name : 'client',
      title : '客户管理',
      auth : 56,
      showChildren : true,
      children : [
        {
          name : 'list',
          title : '客户列表',
          auth : auth.orderList
        },
        {
          name : 'edit',
          title : '添加客户',
          auth : auth.orderList
        }
      ]
    },
    {
      name : 'warehouse',
      title : '仓库管理',
      auth : 56,
      showChildren : true,
      children : [
        {
          name : 'list',
          title : '仓库列表',
          auth : auth.orderList
        },
        {
          name : 'edit',
          title : '新增仓库',
          auth : auth.orderList
        }
      ]
    },
    {
      name : 'facility',
      title : '设备管理',
      auth : 56,
      showChildren : true,
      children : [
        {
          name : 'list',
          title : '设备列表',
          auth : auth.orderList
        },
        {
          name : 'edit',
          title : '新增设备',
          auth : auth.orderList
        },
        {
          name : 'type',
          title : '类型管理',
          auth : auth.orderList
        }
      ]
    },
  ],
  alias : {}
};
