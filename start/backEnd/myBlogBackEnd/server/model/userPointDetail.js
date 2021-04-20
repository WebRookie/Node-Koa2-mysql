const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../db/sql');



class UserPointDetail extends Model {}

UserPointDetail.init({
    user_point_detail_id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment:'用户积分详情ID',
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        defaultValue:null,
        comment:'用户Id'
    },
    user_name:{
        type:DataTypes.STRING(10),
        comment:'用户昵称'
    },
    create_date:{
        type:DataTypes.DATE,
        comment:'创建时间'
    },
    point_type:{
        type:DataTypes.INTEGER,
        comment:'使用的类型：1-订单消费。2-签到获取。3-订单退回。4-完成任务。'
    },
    point: {
        type:DataTypes.INTEGER,
        comment:'积分数量'
    }
},{
    sequelize,
    tableName:'user_point_detail',
    timestamps:false
})

module.exports = UserPointDetail