
// const baseUrl = 'http://127.0.0.1:3000'
const baseUrl = 'http://1.15.51.66:5200'


export function get(url,data = {}){
    return new Promise((resolve,reject) =>{
        wx.request({
          url: baseUrl + url,
          data:data,
          header:{
              'content-type':'application/json',
          },
          method:'GET',
          success:res => {
              resolve(res);
          },
          fail:error => {
              reject(error);
          }
        })
    })
}

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        wx.request({
          url: baseUrl + url,
          data:data,
          header:{
              'content-type':'application/json'
          },
          method:'post',
          success:res =>{
              resolve(res)
          },
          fail:error => {
              reject(error);
          }
        })                                           
    }) 
}