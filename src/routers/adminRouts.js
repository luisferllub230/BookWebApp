import express from 'express';
import {getBooks, getCategories, getAuthor, getEditorials} from '../controller/admin.js';

const adminRoutes = express.Router();

adminRoutes.get('/books', getBooks);
adminRoutes.get('/categoric', getCategories);
adminRoutes.get('/author', getAuthor);
adminRoutes.get('/editorials', getEditorials);

export default adminRoutes;