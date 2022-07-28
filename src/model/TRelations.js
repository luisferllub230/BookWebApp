import BookWebApp from "../dataBase/BookWebApp.js";
import author from "./author.js";
import books from "./books.js";
import categories from './categories.js';
import editorials from './editorials.js';


const relations = () => {

    //editorials relations with books
    editorials.hasMany(books,{
        onDelete: 'CASCADE',
    });
    books.belongsTo(editorials);

    //author relations with books
    author.hasMany(books,{
        onDelete: 'CASCADE',
    });
    books.belongsTo(author);

    //categories relations with books
    categories.hasMany(books,{
        onDelete: 'CASCADE',
    });
    books.belongsTo(categories);
}

export default relations;