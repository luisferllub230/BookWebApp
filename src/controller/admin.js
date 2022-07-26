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
}
const posDelete = (req, res, next) => {
    const type = req.params.type;
    if(type === 'editorial'){
        em.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/admin/editorials')).catch(err => console.log(err));
    }
}

export {getBooks, getCategories, getAuthor, getEditorials, posEditorials, getEdit, posEdit, getDelete, posDelete};