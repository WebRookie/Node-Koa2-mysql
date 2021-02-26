const axios  = require('axios');

const BASE_URL = 'https://api.weixin.qq.com'

// axios.default.timeout = 5000;
// axios.default.baseURl = BASE_URL;



 function get(url,params = {}){
    return new Promise((resolve,reject) => {
        axios({
            method:'get',
            url:BASE_URL + url,
            data:params
        })
    }).then(res => {
        resolve(res)
    }).catch(err =>{
        reject(err)
    })
}
 function post(url, data = {}){
    return new Promise((resolve,reject) => {
        axios({
            method:'post',
            url:BASE_URL + url,
            data:data
        })
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })

}
module.exports = {
    post , get
}