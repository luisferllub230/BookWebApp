import sequelize from "sequelize";


const BookWebApp = new sequelize('bookWebApp', 'root', '1234',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

export default BookWebApp;