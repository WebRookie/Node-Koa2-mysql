const sequelize = require('sequelize')
const { Sequelize } = require('sequelize')

var sequelize = new Sequelize({
    host:'localhost',
    port:'3306',
    username:'user',
    password:'pass',
    database:'shop',
    dialect:'mysql',
    logging:false,
    dialectOptions:{
        charset:'urf8mb4',
        supportBigNumbers:true,
        bigNumberStrings:true
    },
    pool:{
        max:5,
        min:2,
        idle:10000,
    }
    
});
sequelize.authenticate().then(async () => {
    //  console.log(sequelize.models)   实例下的所有model
     console.log("Connection has been established successfully.");
    
    sequelize.sync({alter: true })
  
});