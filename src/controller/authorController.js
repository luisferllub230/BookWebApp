import am from '../model/author.js';
import bm from '../model/books.js';

const sendTotal = (type, render) =>{
    bm.findAll({}).then(b=>{
        const books = b.map(b=>b.dataValues);
        let count, countBooks;

        // taking the size by filter, it is equal to the number of books
        countBooks = type.map(a=>count = books.filter(b=>b.authorId === a.id).length);
        // adding the count to the type
        for(let i = 0; i < type.length; i++){
            type[i]['booksCount'] = countBooks[i];
        }

        render(type);
    }).catch(err => console.log(err))
}

// get post author
const getAuthor = (req, res, next) => {
    am.findAll({}).then(a=>{
        let render = (tt)=>{
            res.render('./admin/authorTools',{
                title: 'Author',
                activeAuthor: true,
                authors: tt
            });
        }
        sendTotal(a.map(a=>a.dataValues), render);
    }).catch(err => console.log(err));
}
const posAuthor = (req, res, next) => {
    am.create({
        AuthorName: req.body.authorN,
        AuthorGmail: req.body.authorG,
    }).then(()=>{
        res.status(200).redirect('/author')
    }).catch(err => console.log(err));
}

//get post edit author
const getEditAuthor = (req, res, next) => {
    am.findOne({ where: {id: req.params.id}}).then(a=>{
        const author = a.dataValues;
        res.render('edit',{
            title: 'Edit Author',
            activeAuthor: true,
            author
        })
    }).catch(err => console.log(err));
}
const posEditAuthor = (req, res, next) => {
    am.update({ AuthorName: req.body.authorN, AuthorGmail: req.body.authorG,},{where: {id: req.body.id}}).then(()=>res.status(200).redirect('/author')).catch(err => console.log(err));
}

// get post delete author
const getDeleteAuthor = (req, res, next) => {
    am.findOne({ where: {id: req.params.id}}).then(a=>{
        const author = a.dataValues;
        res.render('delete',{
            title: 'Delete Author',
            activeAuthor: true,
            author
        })
    }).catch(err => console.log(err));
}
const posDeleteAuthor = (req, res, next) => {
    am.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/author')).catch(err => console.log(err))
}

export { getAuthor, posAuthor, getEditAuthor, posEditAuthor, getDeleteAuthor, posDeleteAuthor};