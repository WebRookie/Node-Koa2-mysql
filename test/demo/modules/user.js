const { DataTypes } = require('sequelize');

const db = require('../sql/index')
const User = db.define(
    'User',
    {
        userId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        userName:{
            type:DataTypes.STRING,
            allowNull:false,
            Field:'userName',
            comment:'昵称/用户名',
            validate:{
                max:16
            }
        },

        password:{
            type:DataTypes.STRING,
            allowNull:false,
            Field:'password',
            comment:'用户密码',
            validate:{
                max:16
            }
        },

        mobileNumber:{
            type:DataTypes.INTEGER,
            allowNull:true,
            Field:'mobileNumber',
            comment:'手机号',
            validate:{
                max:11
            }
        },

        email:{
            type:DataTypes.STRING,
            allowNull:true,
            Field:'email',
            comment:'邮箱'
        }
    }
)
User.sync({force: false})
console.log(User == db.models.User)  //说明已经存进去了
module.exports =  User