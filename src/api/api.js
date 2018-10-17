import  fetch from '../utils/fetch'

const apiHost = 'http://10.179.100.222:8887'

export default {
  testGet: (params) =>  {
    return fetch.post(apiHost + '/opensds/appgroup/listpage', params)
  },
  appgroupAdd: (params) => {
    return fetch.post(apiHost + '/opensds/appgroup/add', params)
  },
  appgroupEdit: (params) => {
    return fetch.post(apiHost + '/opensds/appgroup/edit', params)
  },
  appgroupDelete: (params) => {
    return fetch.post(apiHost + '/opensds/appgroup/delete', params)
  },
  //分页查询应用组
  appgroupListpage: (params) => {
    return fetch.post(apiHost + '/opensds/appgroup/listpage', params)
  },
  //（下拉列表）查询所有应用组
  appgroupListall: (params) => {
    return fetch.post(apiHost + '/opensds/appgroup/listall', params)
  },
  //查询应用组下面的所有应用
  appinfoListall: (params) => {
    return fetch.post(apiHost + '/opensds/appinfo/listall', params)
  },
  //分页查询应用
  appinfoListpage: (params) => {
    return fetch.post(apiHost + '/opensds/appinfo/listpage', params)
  },
  //新增应用
  appinfoAdd: (params) => {
    return fetch.post(apiHost + '/opensds/appinfo/add', params)
  },
  //编辑应用
  appinfoEdit: (params) => {
    return fetch.post(apiHost + '/opensds/appinfo/edit', params)
  },
  //删除应用
  appinfoDelete: (params) => {
    return fetch.post(apiHost + '/opensds/appinfo/delete', params)
  },
  //查询所有策略组（策略组下拉列表使用）
  strategygroupListall: (params) => {
    return fetch.post(apiHost + '/opensds/strategygroup/listall', params)
  },
  //策略组分页查询
  strategygroupListpage: (params) => {
    return fetch.post(apiHost + '/opensds/strategygroup/listpage', params)
  },
  //新增策略组
  strategygroupAdd: (params) => {
    return fetch.post(apiHost + '/opensds/strategygroup/add', params)
  },
  //修改策略组
  strategygroupEdit: (params) => {
    return fetch.post(apiHost + '/opensds/strategygroup/edit', params)
  },
  //克隆策略组
  strategygroupClone: (params) => {
    return fetch.post(apiHost + '/opensds/strategygroup/clone', params)
  },
  //删除策略组
  deleteStrategygroup: (params) => {
    return fetch.post(apiHost + '/opensds/strategygroup/delete', params)
  },
  //新增降级点策略
  pointStrategyAdd: (params) => {
    return fetch.post(apiHost + '/opensds/pointstrategy/add', params)
  },
  //修改降级点策略
  pointStrategyEdit: (params) => {
    return fetch.post(apiHost + '/opensds/pointstrategy/edit', params)
  },
  //删除降级点策略
  pointStrategyDelete: (params) => {
    return fetch.post(apiHost + '/opensds/pointstrategy/delete', params)
  },
  //分页查询降级点策略
  pointStrategyListpage: (params) => {
    return fetch.post(apiHost + '/opensds/pointstrategy/listpage', params)
  }
}
