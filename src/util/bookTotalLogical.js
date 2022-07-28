import bm from '../model/books.js';

const sendTotal = (type, name) =>{
    bm.findAll({}).then(b=>{
        const books = b.map(b=>b.dataValues);
        let count;
        let countBooks;

        // taking the size by filter, it is equal to the number of books
        name === 'author' ? countBooks = type.map(a=>count = books.filter(b=>b.authorId === a.id).length) : null;
        name === 'editorial' ? countBooks = type.map(e=>count = books.filter(b=>b.editorialId === e.id).length) : null;
        name === 'category' ? countBooks = type.map(c=>count = books.filter(b=>b.categoryId === c.id).length) : null;
    
        // adding the count to the type
        for(let i = 0; i < type.length; i++){
            type[i]['booksCount'] = countBooks[i];
        }
    }).catch(err => console.log(err));
    
    return type;
}

export {sendTotal}