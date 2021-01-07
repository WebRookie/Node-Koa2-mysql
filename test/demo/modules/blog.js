const moment = require('moment')
const { DataTypes } = require('sequelize/types')
const user = require('./user')
module.exports = (sequelize,Datatypes) => {
    //创建blog模型
    return sequelize.define(
        'Blog',  //名称
        // 属性
        {
            blogId:{ 
                type:Datatypes.INTEGER,
                primaryKey:true,
                allowNull:false,
                unique:true,
                autoIncrement:true,
                comment:"博客Id"
            },  
            userId:{
                type:DataTypes.INTEGER,
                allowNull:false,
                reference:{
                    model:user,
                    key:'userId'
                },
                onDelete:SET_NULL,

            },
            blogName:{
                type:Datatypes.STRING,
                allowNull:false,
                Field:'blogName',
                comment:'博客名称',
                validate:{
                    max:30
                }
            },
            author:{
                type:Datatypes.STRING,
                allowNull:false,
                Field:'author',
                comment:'作者名称',
                validate:{
                    max:10
                }
            },
            content:{
                type:Datatypes.STRING,
                allowNull:false,
                Field:'content',
                comment:'博客内容',
                validate:{
                    max:8000
                }
            },
            // createTime:{
            //     type:Datatypes.Date,
            //     //默认为创建时间。
            //     defaultValue:moment(Date.now().format('YYYY-MM-DD HH:mm:ss')),
            //     allowNull:false,
            //     Field:'createTime',
            //     comment:'创建时间',
            // },
            // updateTime:{
            //     type:Datatypes.Date,
            //     allowNull:true,
            //     Field:'updateTime',
            //     comment:'更新时间'
            // }
        },
        {
            timestamps:true,
            createdAt:moment(Date.now().format('YYYY-MM-DD HH:mm:ss')),
        }
    )
}