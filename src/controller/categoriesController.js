import cm from '../model/categories.js';
import bm from '../model/books.js';

const sendTotal = (type, render) =>{
    bm.findAll({}).then(b=>{
        const books = b.map(b=>b.dataValues);
        let count, countBooks;
        
        // taking the size by filter, it is equal to the number of books
        countBooks = type.map(c=>count = books.filter(b=>b.categoryId === c.id).length);
        // adding the count to the type
        for(let i = 0; i < type.length; i++){
            type[i]['booksCount'] = countBooks[i];
        }
        
        render(type);
    }).catch(err => console.log(err))
}

//get post category
const getCategories = (req, res, next) => {
    cm.findAll({}).then(c=>{
        let render = (tt)=>{
            res.render('./admin/categoriesTools',{
                title: 'Categories',
                activeCategories: true,
                categories: tt
            });
        } 
        sendTotal(c.map(c=>c.dataValues), render);
    }).catch(err => console.log(err));
}
const posCategory = (req, res, next) => {
    cm.create({
        CategoryName: req.body.categoryN,
        CategoryDescription: req.body.categoryD,
    }).then(()=>{
        res.status(200).redirect('/categoric')
    }).catch(err => console.log(err));
}

//get post edit category
const getEditCategories = (req, res, next) => {
    cm.findOne({ where: {id: req.params.id}}).then(c=>{
        const category = c.dataValues;
        res.render('edit',{
            title: 'Edit Category',
            activeCategory: true,
            category
        })
    }).catch(err => console.log(err));
}
const posEditCategories = (req, res, next) => {
    cm.update({CategoryName: req.body.categoryN,CategoryDescription: req.body.categoryD,},{where: {id: req.body.id}}).then(()=>res.status(200).redirect('/categoric')).catch(err => console.log(err));
}

//get post delete category
const getDeleteCategories = (req, res, next) => {
    cm.findOne({ where: {id: req.params.id}}).then(c=>{
        const category = c.dataValues;
        res.render('delete',{
            title: 'Delete Category',
            activeCategory: true,
            category
        })
    }).catch(err => console.log(err));
}
const posDeleteCategories = (req, res, next) => {
    cm.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/categoric')).catch(err => console.log(err))
}

export {getCategories,posCategory, getEditCategories, posEditCategories, getDeleteCategories, posDeleteCategories};