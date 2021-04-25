const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    // host: 'sstmp.qq.com',
    service:'QQ',
    secure: true,
    auth: {
        user: '912962951@qq.com', //SMTP服务的邮箱
        pass: 'klgdkwovacydbahf' //授权码
    }
});
module.exports = async function sendEmail(email,code) {
    let status = null
    await new Promise((resolve,reject) => {
        transporter.sendMail({
            from: '912962951@qq.com', 
            to: email,
            subject: '逛窑子大队购票系统' ,
            html: `
                <span>尊敬的用户您好，您与2021年4月51日的车票已经购票成功</span>
                <p>什么是快乐星球</p>
                <p>如果你想知道什么是快乐星球的话，我现在就带你研究！</p>
                <p>这是您的验证码：${code} </p>
            `
        },(err,info)=>{
            console.log(err)
            console.log(info)
            if(err){
                 status = 0;
                 reject()
            }else {
                status = 1024;
                resolve()
            }
        })
    })
    return status
}


