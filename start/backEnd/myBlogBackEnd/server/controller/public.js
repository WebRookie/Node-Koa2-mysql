const fs = require('fs')
const path = require('path')



class PublicMethod {
    static async uploadFile(ctx){
        console.log(ctx)
        // 暂时就只是返回存放的地址，只能上传一个一个文件
        let filePath = ctx.request.files.file;
        return filePath
        // ctx.request.files[xxx] 这个里面是参数名
        // let file = ctx.request.files.file
        // // console.log(file)
        // let reader = fs.createReadStream(file.path);
        // // 修改文件名称
        // let newName = 'NewName' + '.' + file.name.split('.')[1];
        // let uploadPath = path.resolve(__dirname, '/public/upload/') + `/${newName}`;
        // // 地址
        // let upStream = fs.createWriteStream(uploadPath);
        // console.log(uploadPath)
        // console.log(upStream)
        // reader.pipe(upStream)
        // console.log(uploadPath)
    }
}

module.exports = PublicMethod