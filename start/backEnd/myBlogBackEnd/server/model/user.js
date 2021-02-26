const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../db/sql');
const crypto = require('crypto')



//定义用户模型
class User extends Model {}


// 初始化用户模型
User.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment:'用户id',
        allowNull:false
    },
    nickName:DataTypes.STRING,
    email: {
        type:DataTypes.STRING(128),
        unique:true
    },
    password: {
        type:DataTypes.STRING(32),
        allowNull: false,

        // 暂不进行密码加密处理
        // set(value) {
        //     // 加密算法
        //     const sc = crypto
        //     this.setDataValue()
        // }
    },
    openId: {
        type: DataTypes.STRING(64),
        unique: true
    }
},{
    sequelize, //传递连接的实例
    tableName: 'user',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
})

module.exports = {
    User
}