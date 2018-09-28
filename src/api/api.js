import  fetch from '../utils/fetch'

const apiHost = 'http://10.179.100.222:8887'

export default {
  testGet: (params) =>  {
    fetch.get(apiHost + '/opensds/appgroup/listpage', params)
  }
}