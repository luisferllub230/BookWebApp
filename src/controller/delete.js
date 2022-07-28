import em from '../model/editorials.js';
import am from '../model/author.js';
import bm from '../model/books.js';
import cm from '../model/categories.js';
import sequelize from 'sequelize';

const getDelete = (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;

    if(type === 'editorial'){
        em.findOne({ where: {id: id}}).then(e=>{
            const editorial = e.dataValues;
            res.render('delete',{
                title: 'Delete Editorial',
                activeEditorial: true,
                editorial
            })
        }).catch(err => console.log(err));
    }

    if(type === 'author'){
        am.findOne({ where: {id: id}}).then(a=>{
            const author = a.dataValues;
            res.render('delete',{
                title: 'Delete Author',
                activeAuthor: true,
                author
            })
        }).catch(err => console.log(err));
    }

    if(type === 'categoric'){
        cm.findOne({ where: {id: id}}).then(c=>{
            const category = c.dataValues;
            res.render('delete',{
                title: 'Delete Category',
                activeCategory: true,
                category
            })
        }).catch(err => console.log(err));
    }

    if(type === 'books'){
        bm.findOne({ where: {id: id}, include:[{model: em}, {model: am}, {model: cm}] }).then(b=>{

            const book = b.dataValues;
            console.log(book.bookImagePath)
            res.render('delete',{
            title: 'Delete Book',
            activeBooks: true,
            book
            })

        }).catch(err => console.log(err));
    }
}
const posDelete = (req, res, next) => {
    const type = req.params.type;

    type === 'editorial' ? em.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/editorials')).catch(err => console.log(err)): null

    type === 'author' ? am.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/author')).catch(err => console.log(err)): null

    type === 'categoric' ? cm.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/categoric')).catch(err => console.log(err)): null

    type === 'book' ? bm.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/books')).catch(err => console.log(err)): null
}

export {posDelete,getDelete}