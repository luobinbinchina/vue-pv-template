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
  appgroupListpage: (params) => {
    return fetch.post(apiHost + '/opensds/appgroup/listpage', params)
  },
  appgroupListall: (params) => {
    return fetch.post(apiHost + '/opensds/appgroup/listall', params)
  },
  appinfoListpage: (params) => {
    return fetch.post(apiHost + '/opensds/appinfo/listpage', params)
  },
  appinfoAdd: (params) => {
    return fetch.post(apiHost + '/opensds/appinfo/add', params)
  },
  appinfoEdit: (params) => {
    return fetch.post(apiHost + ' /opensds/appinfo/edit', params)
  },
  appinfoDelete: (params) => {
    return fetch.post(apiHost + ' /opensds/appinfo/delete', params)
  }
}
