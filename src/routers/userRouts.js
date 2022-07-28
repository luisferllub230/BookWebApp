import express from 'express';
import {getHome, getBook, postBook} from '../controller/users.js';

const usersRouters = express.Router();


usersRouters.get('/',getHome);
usersRouters.post('/',postBook);
usersRouters.get('/home/book/:id',getBook);


export default usersRouters;