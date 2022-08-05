import express from 'express';
import {get404} from '../controller/errorsController.js';
import {getHome, getBook, postBook} from '../controller/homeController.js';
import {getBooks,getDeleteBooks,getEditBooks,posBooks,posDeleteBooks,posEditBooks} from '../controller/booksController.js';
import {getAuthor,posAuthor,getEditAuthor,posEditAuthor,getDeleteAuthor,posDeleteAuthor} from '../controller/authorController.js';
import {getEditorials,posEditorials,getEditEditorials,posEditEditorials,getDeleteEditorials,posDeleteEditorials} from '../controller/editorialController.js';
import {getCategories,posCategory,getEditCategories,posEditCategories,getDeleteCategories,posDeleteCategories} from '../controller/categoriesController.js';

const router = express.Router();

//home
router.get('/',getHome);
router.post('/',postBook);
router.get('/home/book/:id',getBook);

//books
router.get('/books', getBooks);
router.post('/books', posBooks);
router.get('/edit/books/:id', getEditBooks);
router.post('/edit/books', posEditBooks);
router.get('/delete/books/:id', getDeleteBooks);
router.post('/delete/books', posDeleteBooks);

//author
router.get('/author', getAuthor);
router.post('/author', posAuthor);
router.post('/edit/author', posEditAuthor);
router.get('/edit/author/:id', getEditAuthor);
router.get('/delete/author/:id', getDeleteAuthor);
router.post('/delete/author', posDeleteAuthor);

//editorial
router.get('/editorials', getEditorials);
router.post('/editorials', posEditorials);
router.get('/edit/editorials/:id', getEditEditorials);
router.post('/edit/editorials', posEditEditorials);
router.get('/delete/editorials/:id', getDeleteEditorials);
router.post('/delete/editorials', posDeleteEditorials);

//categories
router.get('/categoric', getCategories);
router.post('/categoric', posCategory);
router.get('/edit/categoric/:id', getEditCategories);
router.post('/edit/categoric', posEditCategories);
router.get('/delete/categoric/:id', getDeleteCategories);
router.post('/delete/categoric', posDeleteCategories);

//error
router.use('/', get404);

export default router;