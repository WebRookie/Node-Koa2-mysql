const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db/sql');


class Blog extends Model {}

Blog.init({
    blog_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        comment:'博客Id',
        allowNull:false
    },
    user_id: {
        type:DataTypes.INTEGER,
        defaultValue:null,
        comment:'用户Id'
    },
    author_name:{
        type:DataTypes.STRING(20),
        comment:'博客作者名',
    },
    content: {
        type:DataTypes.STRING(500),
        allowNull:false,
        comment:'博客内容'
    },
    like_count: {
        type:DataTypes.INTEGER,
        defaultValue:0,
        comment:'点赞人数'
    },
    comment_count: {
        type:DataTypes.INTEGER,
        defaultValue:0,
        comment:'博客评论数量'
    }
},{
    sequelize,
    tableName:'blog',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
})
module.exports = Blog