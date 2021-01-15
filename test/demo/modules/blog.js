const {
    DataTypes
} = require('sequelize')
const db = require('../sql/index')
const {
    models
} = require('../sql/index');

const User = require('./user')
//创建blog模型
const Blog = db.define(
    'Blog', //名称
    // 属性
    {
        blogId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            comment: "博客Id"
        },
        // userId:{
        //     type:DataTypes.INTEGER,
        //     row:false,
        //     allowNull:false,
        //     reference:{
        //         model:user,
        //         key:'userId'
        //     },
        //     onDelete:"SET NULL",

        // },
        blogName: {
            type: DataTypes.STRING(30),
            allowNull: false,
            Field: 'blogName',
            comment: '博客名称',
        },
        userName: {
            type: DataTypes.STRING(10),
            allowNull: false,
            Field: 'userName',
            comment: '作者名称',
        },
        content: {
            type: DataTypes.STRING(8000),
            allowNull: false,
            Field: 'content',
            comment: '博客内容',
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }, {
        define: {
            freezeTableName: true,
        } // 避免自动生成表明
    }
)
//自动生表
Blog.sync({
    alter: true
});
module.exports = Blog;