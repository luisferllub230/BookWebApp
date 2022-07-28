import sequelize from "sequelize";
import  bookWebApp  from "../dataBase/BookWebApp.js";

const categories = bookWebApp.define('categories', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CategoryName:{
        type: sequelize.STRING,
        allowNull: false
    },
    CategoryDescription:{
        type: sequelize.STRING,
        allowNull: false
    },
});


export default categories;