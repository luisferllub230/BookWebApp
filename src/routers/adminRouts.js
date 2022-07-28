import express from 'express';
import {getBooks, getCategories, getAuthor, getEditorials, posEditorials, posAuthor,posCategory, posBooks} from '../controller/admin.js';
import { getEdit, posEdit } from '../controller/edit.js';
import {getDelete, posDelete} from '../controller/delete.js';

const adminRoutes = express.Router();

adminRoutes.get('/books', getBooks);
adminRoutes.post('/books', posBooks);

adminRoutes.get('/categoric', getCategories);
adminRoutes.post('/categoric', posCategory);

adminRoutes.get('/author', getAuthor);
adminRoutes.post('/author', posAuthor);

adminRoutes.get('/editorials', getEditorials);
adminRoutes.post('/editorials', posEditorials);

adminRoutes.post('/edit/:type', posEdit);
adminRoutes.get('/edit/:type/:id', getEdit);

adminRoutes.post('/delete/:type', posDelete);
adminRoutes.get('/delete/:type/:id', getDelete);

export default adminRoutes;