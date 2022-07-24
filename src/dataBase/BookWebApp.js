import sequelize from "sequelize";


const BookWebApp = new sequelize('bookwebapp', 'root', '1234',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});