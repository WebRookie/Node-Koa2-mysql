const { DataTypes } = require("sequelize/types");

module.exports =  async(sequelize,DataTypes) => {
    return sequelize.define(
        'user',
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
}