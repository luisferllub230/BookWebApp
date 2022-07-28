import sequelize from "sequelize";
import bookWebApp  from "../dataBase/BookWebApp.js";

const author = bookWebApp.define('author', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    AuthorName:{
        type: sequelize.STRING,
        allowNull: false
    },
    AuthorGmail:{
        type: sequelize.STRING,
        allowNull: false
    }
});

export default author;