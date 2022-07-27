import em from '../model/editorials.js';
import am from '../model/author.js';
import bm from '../model/books.js';
import cm from '../model/categories.js';
import sequelize from 'sequelize';
import {sendTotal} from '../util/bookTotalLogical.js';

//*********************books*****************/
const getBooks = (req, res, next) => {
    res.render('./admin/booksTools',{
        title: 'Books',
        activeBooks: true
    });
}

//**********************categories**************************/
const getCategories = (req, res, next) => {
    cm.findAll({}).then(c=>{
        let tt = sendTotal(c.map(c=>c.dataValues), 'category')
        setTimeout(()=>{
            res.render('./admin/categoriesTools',{
                title: 'Categories',
                activeCategories: true,
                categories: tt
            });
        }, 1000)
    }).catch(err => console.log(err));
}

const posCategory = (req, res, next) => {
    cm.create({
        CategoryName: req.body.categoryN,
        CategoryDescription: req.body.categoryD,
    }).then(()=>{
        res.status(200).redirect('/admin/categoric')
    }).catch(err => console.log(err));
}

//**********************Author**************************/
const getAuthor = (req, res, next) => {
    am.findAll({}).then(a=>{
        let tt = sendTotal(a.map(a=>a.dataValues), 'author')
        setTimeout(()=>{
            res.render('./admin/authorTools',{
                title: 'Author',
                activeAuthor: true,
                authors: tt
            });
        }, 1000)

    }).catch(err => console.log(err));
}

const posAuthor = (req, res, next) => {
    am.create({
        AuthorName: req.body.authorN,
        AuthorGmail: req.body.authorG,
    }).then(()=>{
        res.status(200).redirect('/admin/author')
    }).catch(err => console.log(err));
}

//**********************editorial**************************/
const getEditorials = (req, res, next) => {
    em.findAll({}).then(e=>{
        let tt = sendTotal(e.map(e=>e.dataValues), 'editorial')
        setTimeout(()=>{
            res.render('./admin/editorialsTools',{
                title: 'Editorials',
                activeEditorials: true,
                editorials: tt
            });
        }, 1000)
    }).catch(err => console.log(err));
}

const posEditorials = (req, res, next) => {
    em.create({
        EditorialName: req.body.editorialN,
        EditorialPhone: req.body.editorialP,
        EditorialCountry: req.body.editorialC,
    }).then(()=>{
        res.status(200).redirect('/admin/editorials')
    }).catch(err => console.log(err));
}

//*********************edit*****************/
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
}
const posEdit = (req, res, next) => {
    const type = req.params.type;

    if(type === 'editorial'){
        em.update({
            EditorialName: req.body.editorialN,
            EditorialPhone: req.body.editorialP,
            EditorialCountry: req.body.editorialC,
        },
        {where: {id: req.body.id}
        }).then(()=>res.status(200).redirect('/admin/editorials')).catch(err => console.log(err));
    }

    if(type === 'author'){
        am.update({
            AuthorName: req.body.authorN,
            AuthorGmail: req.body.authorG,
        },
        {where: {id: req.body.id}
        }).then(()=>res.status(200).redirect('/admin/author')).catch(err => console.log(err));
    }

    if(type === 'categoric'){
        cm.update({
            CategoryName: req.body.categoryN,
            CategoryDescription: req.body.categoryD,
        },
        {where: {id: req.body.id}
        }).then(()=>res.status(200).redirect('/admin/categoric')).catch(err => console.log(err));
    }
}

/**********************delete**************************/
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
}
const posDelete = (req, res, next) => {
    const type = req.params.type;
    if(type === 'editorial'){
        em.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/editorials')).catch(err => console.log(err));
    }

    if(type === 'author'){
        am.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/author')).catch(err => console.log(err));
    }

    if(type === 'categoric'){
        cm.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/categoric')).catch(err => console.log(err));
    }
}

export {getBooks, getCategories, getAuthor, getEditorials, posEditorials, getEdit, posEdit, getDelete, posDelete, posAuthor, posCategory};