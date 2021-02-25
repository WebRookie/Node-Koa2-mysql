const sequelize = require('sequelize')
const { Sequelize } = require('sequelize')
const {dbName, host, port, username, password } = require('../config').database

var sequelize = new Sequelize({
    host: host,
    port: port,
    username: username,
    password: password,
    database: dbName,
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