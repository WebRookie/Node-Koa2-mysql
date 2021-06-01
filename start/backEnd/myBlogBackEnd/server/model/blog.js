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
    },
    picture: {
        type:DataTypes.STRING(1500),
        defaultValue:null,
        allowNull:true,
        comment:'博客图片'
    }
},{
    sequelize,
    tableName:'blog',
    timestamps:true,
    createdAt:'create_at',
    updatedAt:'update_at',
})

module.exports = Blog

// 需要写对应的持久层方法，sequelize才会自动生成相应的表 (也就是增删改查~)