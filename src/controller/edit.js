import em from '../model/editorials.js';
import am from '../model/author.js';
import bm from '../model/books.js';
import cm from '../model/categories.js';
import sequelize from 'sequelize';

const getEdit = (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    

    if(type === 'editorial'){
        em.findOne({ where: {id: id}}).then(e=>{
            const editorial = e.dataValues;
            res.render('edit',{
                title: 'Edit Editorial',
                activeEditorial: true,
                editorial
            })
        }).catch(err => console.log(err));
    }

    if(type === 'author'){
        am.findOne({ where: {id: id}}).then(a=>{
            const author = a.dataValues;
            res.render('edit',{
                title: 'Edit Author',
                activeAuthor: true,
                author
            })
        }).catch(err => console.log(err));
    }

    if(type === 'categoric'){
        cm.findOne({ where: {id: id}}).then(c=>{
            const category = c.dataValues;
            res.render('edit',{
                title: 'Edit Category',
                activeCategory: true,
                category
            })
        }).catch(err => console.log(err));
    }

    if(type === 'books'){
        bm.findOne({ where: {id: id}}).then(b=>{
            const book = b.dataValues;
            em.findAll({}).then(e=>{
                const editorials = e.map(e=>e.dataValues);
                am.findAll({}).then(a=>{
                    const authors = a.map(a=>a.dataValues);
                    cm.findAll({}).then(c=>{
                        const categoric = c.map(c=>c.dataValues);
                        
                        res.render('edit',{
                            title: 'Edit Book',
                            activeBooks: true,
                            book,
                            editorials,
                            authors,
                            categoric
                        })

                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }
}
const posEdit = (req, res, next) => {
    const type = req.params.type;

    type === 'editorial' ? em.update({EditorialName: req.body.editorialN,EditorialPhone: req.body.editorialP,EditorialCountry: req.body.editorialC,},{where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/editorials')).catch(err =>console.log(err)) : null;

    type === 'author' ? am.update({ AuthorName: req.body.authorN, AuthorGmail: req.body.authorG,},{where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/author')).catch(err => console.log(err)) : null;

    type === 'categoric' ? cm.update({CategoryName: req.body.categoryN,CategoryDescription: req.body.categoryD,},{where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/categoric')).catch(err => console.log(err)): null;

    //note dont edit the imgs
    type === 'books' ? bm.update({BookName: req.body.bookN,bookYear: req.body.BookYear ,BookEditorial: req.body.bookEditorial,BookAuthor: req.body.bookAuthor,BookCategory: req.body.bookCategory, bookImgPath: img },{where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/books')).catch(err => console.log(err)) : null;
}

export {posEdit, getEdit};