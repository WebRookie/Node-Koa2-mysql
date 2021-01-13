const {
    DataTypes
} = require('sequelize');

const db = require('../sql/index')
const User = db.define(
    'User', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },

        userName: {
            type: DataTypes.STRING(16), // 这样就设置字符串长度不能超过16
            allowNull: false,
            Field: 'userName',
            comment: '昵称/用户名',
            // validate:{
            //     max:16   这个设置的是值的大小最大是16 所以容易比较错误。
            // }
        },

        password: {
            type: DataTypes.STRING(16),  //定义密码长度在这里而下面的validate是比价值的大小
            allowNull: false,
            Field: 'password',
            comment: '用户密码',
            // validate: {
            //     max: 16
            // }
        },

        mobileNumber: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            Field: 'mobileNumber',
            comment: '手机号',
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true,
            Field: 'email',
            comment: '邮箱'
        }
    }, {
        define: {
            freezeTableName: true,
        }
    }
)

User.sync({
    alter: true
})
console.log(User == db.models.User) //说明已经初始化好模型了
module.exports = User