import BookWebApp from "../dataBase/BookWebApp.js";
import author from "./author.js";
import books from "./books.js";
import categories from './categories.js';
import editorials from './editorials.js';


const relations = () => {

    //editorials relations with author
    editorials.hasOne(author);
    author.belongsTo(editorials,{
        name: 'editorialsID',
        delete: 'CASCADE',
    });

    //editorials relations with books
    editorials.hasOne(books);
    books.belongsTo(editorials,{
        name: 'editorialsID',
        delete: 'CASCADE',
    });

    //author relations with books
    author.hasOne(books);
    books.belongsTo(author,{
        name: 'authorID',
        delete: 'CASCADE',
    });

    //categories relations with books
    categories.hasOne(books);
    books.belongsTo(categories,{
        name: 'categoriesID',
        delete: 'CASCADE',
    });
}

export default relations;