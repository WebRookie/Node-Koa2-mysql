const shedule = require('node-schedule');
const User = require('../server/model/user')
/**
 * 自动每0.00分更改签到状态
 */

function autoBackSignStatus(){
    shedule.scheduleJob('0 0 0 * * *',function(){
        let userInfo = User.findOne({})
    })
}