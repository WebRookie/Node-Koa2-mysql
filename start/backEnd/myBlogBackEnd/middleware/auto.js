const shedule = require("node-schedule");
let User = require("../server/model/user");
const logUtil = require('../util/log')
/**
 * 自动每0.00分更改签到状态
 */

function autoBackSignStatus() {
    //每天12点1分30秒执行这个自动任务然后写入日志中
  shedule.scheduleJob("30 1 0 * * *", function () {
    // User.findAll({
    //     attributes:['today_sign']}).on('success', function(projects ) {
    //     console.log(projects);
    // })
    User.update({ today_sign: '0' },{
        where:{
            'today_sign':'1'
        }
    }).then(res =>{
        console.log(res)

    })
    // let userInfo = User.findOne({})
  });
}
exports.autoBackSignStatus = autoBackSignStatus;
