import sequelize from "sequelize";
import bookWebApp  from "../dataBase/BookWebApp.js";

const editorials = bookWebApp.define('editorials', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    EditorialName:{
        type: sequelize.STRING,
        allowNull: false
    },
    EditorialPhone:{
        type: sequelize.STRING,
        allowNull: false
    },
    EditorialCountry:{
        type: sequelize.STRING,
        allowNull: false
    }
});

export default editorials;