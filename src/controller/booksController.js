import em from '../model/editorials.js';
import am from '../model/author.js';
import bm from '../model/books.js';
import cm from '../model/categories.js';
import nodemailer from 'nodemailer';

//email configuration
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

//get post books
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

    bm.create({BookName: BookName,BookYear: bookYear,bookImagePath: "/"+bookImg.path ,authorId: bookA,editorialId: bookE,categoryId: bookC,}).then(()=>{
        am.findOne({where:{id: bookA}}).then(a=>{

            res.status(200).redirect('/books')
            const AuthorEmail = a.dataValues.AuthorGmail;
            transporter.sendMail({
                from: 'Book web App notification',
                to: `${AuthorEmail}`,
                subject: 'New book published', 
                html: `New book ${BookName} has been added to the database,<br><br>we have published a book of your authorship`
            },(err)=>console.log(err));

        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

//get post edit books
const getEditBooks = (req, res, next) => {
    bm.findOne({ where: {id: req.params.id}}).then(b=>{
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
const posEditBooks = (req, res, next) => {
    
    let img = req.file;

    bm.findOne({where: {id: req.body.id}}).then(b=>{
        let book = b.dataValues;

        let update = () => {
            let imgPath = img ? "/"+img.path : book.bookImagePath;
            
            bm.update({BookName: req.body.bookN,bookYear: req.body.BookYear ,BookEditorial: req.body.bookEditorial,BookAuthor: req.body.bookAuthor,BookCategory: req.body.bookCategory, bookImagePath: imgPath},{where: {id: req.body.id}}).then(()=>res.status(200).redirect('/books')).catch(err => console.log(err));
        }
        
        book ? update() : res.status(200).redirect('/books');
    }).catch(err => console.log(err));

}

//get post delete books
const getDeleteBooks = (req, res, next) => {
    bm.findOne({ where: {id: req.params.id}, include:[{model: em}, {model: am}, {model: cm}] }).then(b=>{
        const book = b.dataValues;
        console.log(book.bookImagePath)
        res.render('delete',{
        title: 'Delete Book',
        activeBooks: true,
        book
        })
    }).catch(err => console.log(err));
}
const posDeleteBooks = (req, res, next) => {
    bm.destroy({where: {id: req.body.id}}).then(()=>res.status(200).redirect('/books')).catch(err => console.log(err));
}

export {getBooks, posBooks, getEditBooks, posEditBooks, getDeleteBooks, posDeleteBooks};