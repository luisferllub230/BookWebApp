import em from '../model/editorials.js';
import am from '../model/author.js';
import bm from '../model/books.js';
import cm from '../model/categories.js';
import nodemailer from 'nodemailer';
import sequelize from 'sequelize';
import {sendTotal} from '../util/bookTotalLogical.js';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'aletesting3@gmail.com',
        pass: 'xzvnopcxxygtfaym'
    },
    tls:{
        rejectUnauthorized: false
    }
});

//*********************books*****************/
const getBooks = (req, res, next) => {
    bm.findAll({include: [{model: em}, {model: am}, {model: cm}]}).then(b=>{
        const books = b.map(b=>b.dataValues);
        em.findAll({}).then(e=>{
            const editorials = e.map(e=>e.dataValues);
            am.findAll({}).then(a=>{
                const authors = a.map(a=>a.dataValues);
                cm.findAll({}).then(c=>{
                    const categoric = c.map(c=>c.dataValues);

                    res.render('./admin/booksTools',{
                        title: 'Books',
                        activeBooks: true,
                        books,
                        editorials,
                        authors,
                        categoric
                    });

                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

const posBooks = (req, res, next) => {
    const BookName = req.body.bookN, bookYear = req.body.bookYear, bookImg = req.file, bookA = req.body.bookAuthor, bookE = req.body.bookEditorial, bookC = req.body.bookCategory;

    bm.create({BookName: BookName,BookYear: bookYear,bookImagePath: "/"+bookImg.path ,authorId: bookA,editorialId: bookE,categoryId: bookC,})
    .then(()=>{
        am.findOne({where:{id: bookA}}).then(a=>{

            const AuthorEmail = a.dataValues.AuthorGmail;
            res.status(200).redirect('/admin/books')
            transporter.sendMail({
                from: 'Book web App notification',
                to: `${AuthorEmail}`,
                subject: 'New book published', 
                html: `New book ${BookName} has been added to the database,<br><br>we have published a book of your authorship`
            },(err)=>console.log(err));

        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
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

export {getBooks, getCategories, getAuthor, getEditorials, posEditorials, posAuthor, posCategory, posBooks};