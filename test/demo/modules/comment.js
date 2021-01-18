// const { DataTypes } = require('sequelize');
// // 引入sequelize实例
// const db = require('../sql/index');

// const Comment = db.define(
//     'Comments',
//     {
//         commentId:{
//             type:DataTypes.INTEGER,
//             primaryKey:true,
//             autoIncrement:true,
//             allowNull:false,
//             unique:true
//         },
//         commentInfo:{
//             type:DataTypes.STRING(200),
//             allowNull:false,
//             field:'commentInfo',
//             comment:'评论详情'
//         },
//         userName:{
//             type:DataTypes.STRING(16),
//             allowNull:false,
//             field:'userName',
//             comment:'评论人昵称'
//         },
//         userId:{
//             type:DataTypes.INTEGER,
//             allowNull:false,
//             field:'userId',
//             comment:'评论人Id'
//         },
//         blogId:{
//             type:DataTypes.INTEGER(),
//             allowNull:false,
//             field:'blogId',
//             comment:'评论博客ID'
//         }
//     },{
//         timestamps:true,
//         createdAt:'commentTime'
//     }
// )

// Comment.sync({
//     alter:true
// });



// module.exports = Comment