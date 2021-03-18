const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../db/sql');
const crypto = require('crypto')



//定义用户模型
class User extends Model {}


// 初始化用户模型
User.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment:'用户id',
        allowNull:false
    },
    nick_name:DataTypes.STRING,
    gender:{
        type:DataTypes.ENUM('male','famale','none'),
        defaultValue:'none' 
    },
    img:{
        type:DataTypes.CHAR,
        comment:'用户头像地址'
    },
    email: {
        type:DataTypes.STRING(128),
        unique: 'column'

    },
    point: {
        type:DataTypes.INTEGER(11),
        defaultValue:0,
        comment:'用户积分'
    },
    // password: {
        // type:DataTypes.STRING(32),
        // allowNull: false,

        // 暂不进行密码加密处理
        // set(value) {
        //     // 加密算法
        //     const sc = crypto
        //     this.setDataValue()
        // }
    // },
    open_id: {
        type: DataTypes.STRING(64),
        unique: 'column',
        // unique:true,
        comment:'用户的openId'
        //这里不能使用unique:true 
        /**
         * 当sequelize.sync({alter:true})的时候，每次执行都会添加一个index(column, column2, column3，。。)
         */
    },
    today_sign:{
        type:DataTypes.ENUM('0','1'),
        defaultValue:'0',
        comment:'用户是否签到，0-是未签到。1-是已签到',

    },
    yesterday_sign:{
        type:DataTypes.ENUM('0','1'),
        defaultValue:'0',
        comment:'用户是否签到，0-是未签到。1-是已签到',
    },
    last_login_date:{
        type:DataTypes.DATE,
        comment:'最后登录时间'
    },
    continue_sign:{
        type:DataTypes.INTEGER,
        defaultValue:0,
        comment:'用户连续签到'
    },
},{
    sequelize, //传递连接的实例
    tableName: 'user',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
})
module.exports = User
