const { DataTypes, Model}  = require('sequelize');
const sequelize = require('../../db/sql');


class BlogLike extends Model{}

BlogLike.init({
    blog_like_id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '博客喜欢ID',
        allowNull: false,
    },
    blog_id: {
        type:DataTypes.INTEGER,
        comment:'博客Id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        comment:'用户Id'
    }
},{
    sequelize,
    tableName: 'blog_like',
    timestamps: true,
    createdAt:'create_at'
})

module.exports = Blog