import bm from '../model/books.js';

const sendTotal = (type, name) =>{
    bm.findAll({}).then(b=>{
        const books = b.map(b=>b.dataValues);
        let countBooks;

        // taking the size by filter, it is equal to the number of books
        if(name === 'author'){
            countBooks = type.map(a=>{
                const count = books.filter(b=>b.authorId === a.id).length;
                return count;
            });
        }
        if(name === 'editorial'){
            countBooks = type.map(e=>{
                const count = books.filter(b=>b.editorialId === e.id).length;
                return count;
            });
        }

        // adding the count to the type
        for(let i = 0; i < type.length; i++){
            type[i]['booksCount'] = countBooks[i];
        }
    }).catch(err => console.log(err));
    
    return type;
}

export {sendTotal}