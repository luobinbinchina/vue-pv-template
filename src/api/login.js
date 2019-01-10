import utils from '../utils/utils';

// 根据环境设置SSO地址
const ssoApiHost = (utils.getEnv() === 'online' ? 'http://mis.diditaxi.com.cn/auth' : 'http://mis-test.diditaxi.com.cn/auth');
const ssoHost = (utils.getEnv() === 'online' ? 'https://star.xiaojukeji.com/data/ssologinweb.node' : 'http://page-daily.kuaidadi.com/data/ssologinweb.node');
const appId = 2260;

// 配置公有Ajax
const CommonAjax = (url, type, params) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: type,
            data: params,
            success: (data) => {
                resolve(data)
            },
            error: (err) => {
                reject(err)
            }
        })
    })
}

export default {
    checkCode: (params) => {
        return CommonAjax(ssoHost, 'POST', Object.assign({
            apiName: 'checkCode'
        }, params))
    },
    checkTicket: (params) => {
        return CommonAjax(ssoHost, 'POST', Object.assign({
            apiName: 'checkTicket'
        }, params))
    },
    getUserInfo: (params) => {
        return CommonAjax(ssoHost, 'POST', Object.assign({
            apiName: 'getUserInfo'
        }, params))
    },
    loginInitData: {
        ssoApiHost,
        ssoHost,
        appId
    }
}