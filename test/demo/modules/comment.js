const { DataTypes } = require('sequelize');
// 引入sequelize实例
const db = require('../sql/index');

const Blog = require("./blog");
const User = require("./user");

const Comment = db.define(
    'Comments',
    {
        commentId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            unique:true
        },
        commentInfo:{
            type:DataTypes.STRING(200),
            allowNull:false,
            field:'commentInfo',
            comment:'评论详情'
        },
        userName:{
            type:DataTypes.STRING(16),
            allowNull:false,
            field:'userName',
            comment:'评论人昵称'
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            field:'userId',
            comment:'评论人Id'
        },
        blogId:{
            type:DataTypes.INTEGER(),
            allowNull:false,
            field:'blogId',
            comment:'评论博客ID'
        }
    },{
        timestamps:true,
        createdAt:'commentTime'
    },{
        define:{
            freezeTableName:true
        }
    }
)

Comment.sync({
    alter:true
});

// User.hasMany(Comment,{foreignKey:'userId', targetKey:'userId',sourceKey:'userId'});
// Comment.belongsTo(Blog,{foreignKey:'blogId', targetKey:'blogId',sourceKey:'blogId'});
User.hasMany(Comment,{
    foreignKey:{
        name:'userId'
    }
});
Blog.hasMany(Comment,{
    foreignKey:{
        name:'blogId'
    }
})
Comment.belongsTo(User,{
    foreignKey:{
        name:'userId'
    }
});
Comment.belongsTo(Blog,{
    foreignKey:{
        name:'blogId'
    }
});

/**
 * 将在外键(blog)foreignkey的名字为blogId。
 * 最前面的是元模型，就是source 后面的是目的模型 就是target(目的模型的名字就是targetKey)
 */


module.exports = Comment