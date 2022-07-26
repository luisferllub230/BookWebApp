import sequelize from "sequelize";
import bookWebApp  from "../dataBase/BookWebApp.js";

const books = bookWebApp.define('books', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    BookName:{
        type: sequelize.STRING,
        allowNull: false
    },
});

export default books;