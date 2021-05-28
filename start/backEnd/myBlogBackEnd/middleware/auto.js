const shedule = require('node-schedule');
let User = require('../server/model/user')
/**
 * 自动每0.00分更改签到状态
 */

function autoBackSignStatus(){
    shedule.scheduleJob('0 1 * * * *',function(){
        User.findAll({
            attributes:['today_sign']}).on('success', function(projects ) {
            console.log(projects);
        })
        // let userInfo = User.findOne({})
    })
}
exports.autoBackSignStatus = autoBackSignStatus