import em from '../model/editorials.js';
import bm from '../model/books.js';
import sequelize from 'sequelize';

const getBooks = (req, res, next) => {
    res.render('./admin/adminTools',{
        title: 'Books',
        activeBooks: true
    });
}

const getCategories = (req, res, next) => {
    res.render('./admin/adminTools',{
        title: 'Categories',
        activeCategories: true
    });
}

const getAuthor = (req, res, next) => {
    res.render('./admin/adminTools',{
        title: 'Author',
        activeAuthor: true
    });
}

const getEditorials = (req, res, next) => {

    em.findAll({
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('books.editorialId')), 'booksCount']]
        },
        include: [{
            model: bm, attributes: []
        }]
    }).then(e=>{
    
        const editorials = e.map(e=>e.dataValues);  
            
        console.log(editorials);
    
        res.render('./admin/editorialsTools',{
            title: 'Editorials',
            activeEditorials: true,
            editorials
        });
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

export {getBooks, getCategories, getAuthor, getEditorials, posEditorials};