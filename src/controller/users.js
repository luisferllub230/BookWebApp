import em from '../model/editorials.js';
import am from '../model/author.js';
import bm from '../model/books.js';
import cm from '../model/categories.js';
import { Op } from 'sequelize';
import categories from '../model/categories.js';


const  getHome =  (req, res, next) => {
    bm.findAll({include: [{model: em}, {model: am}, {model: cm}]}).then(b=>{
        cm.findAll().then(c=>{
            const categories = c.map(c=>c.dataValues);
            const books = b.map(b=>b.dataValues);
            res.render('index',{
                title: 'Home',
                activeHome: books < 0 ? false : true,
                books,
                categories
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}


const postBook = (req, res, next) => {
    const cId = req.body.inputID ? req.body.inputID : 0;
    const bN = req.body.name ? req.body.name : null;
    bm.findAll({
        include: [{model: em}, {model: am}, {model: cm}],
        where: {
            [Op.or]: [
                {
                    categoryId: cId
                },
                {
                    BookName:{
                        [Op.like]: bN
                    }
                }
            ],
        }
    }).then(b => {
        cm.findAll().then(c => {
            const categories = c.map(t => t.dataValues);
            const books = b.map(b => b.dataValues);

            res.render('index', {
                title: 'Books',
                activeHome: true,
                books,
                categories,
                activeBook: true
            })
        }).catch(err => {});
    }).catch(err => console.log(err));
}

const getBook = (req, res, next) => {
    bm.findOne({where: {id: req.params.id}, include: [{model: em}, {model: am}, {model: cm}]}).then(b=>{
        const book = b.dataValues;
        em.findOne({where: {id: b.editorialId}}).then(e=>{
            const edi = e.dataValues;
            console.log(edi);
            res.render('bookInfo',{
                title: 'Book',
                activeBook: true,
                book,
                edi
            });

        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

export {getHome, getBook, postBook};