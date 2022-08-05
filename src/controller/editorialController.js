import em from '../model/editorials.js';
import bm from '../model/books.js';

const sendTotal = (type, render) =>{
    bm.findAll({}).then(b=>{
        const books = b.map(b=>b.dataValues);
        let count, countBooks;

        // taking the size by filter, it is equal to the number of books
        countBooks = type.map(e=>count = books.filter(b=>b.editorialId === e.id).length);
        // adding the count to the type
        for(let i = 0; i < type.length; i++){
            type[i]['booksCount'] = countBooks[i];
        }

        render(type);
    }).catch(err => console.log(err))
}

//get post editorials
const getEditorials = (req, res, next) => {
    em.findAll({}).then(e=>{
        let render = (tt) => {
            res.render('./admin/editorialsTools',{
                title: 'Editorials',
                activeEditorials: true,
                editorials: tt
            });
        }
        sendTotal(e.map(e=>e.dataValues), render)
    }).catch(err => console.log(err));
}
const posEditorials = (req, res, next) => {
    em.create({
        EditorialName: req.body.editorialN,
        EditorialPhone: req.body.editorialP,
        EditorialCountry: req.body.editorialC,
    }).then(()=>{
        res.status(200).redirect('editorials')
    }).catch(err => console.log(err));
}

//get post edit editorials
const getEditEditorials = (req, res, next) => {
    em.findOne({ where: {id: req.params.id}}).then(e=>{
        const editorial = e.dataValues;
        res.render('edit',{
            title: 'Edit Editorial',
            activeEditorial: true,
            editorial
        })
    }).catch(err => console.log(err));
}
const posEditEditorials = (req, res, next) => {
    em.update({EditorialName: req.body.editorialN,EditorialPhone: req.body.editorialP,EditorialCountry: req.body.editorialC,},{where: {id: req.body.id}}).then(()=>res.status(200).redirect('/editorials')).catch(err =>console.log(err));
}

//get post delete editorials
const getDeleteEditorials = (req, res, next) => {
    em.findOne({ where: {id: req.params.id}}).then(e=>{
        const editorial = e.dataValues;
        res.render('delete',{
            title: 'Delete Editorial',
            activeEditorial: true,
            editorial
        })
    }).catch(err => console.log(err));
}
const posDeleteEditorials = (req, res, next) => {
 em.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/editorials')).catch(err => console.log(err));
}

export {getEditorials, posEditorials, getEditEditorials, posEditEditorials, getDeleteEditorials, posDeleteEditorials};