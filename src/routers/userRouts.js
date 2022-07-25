import express from 'express';
import {getHome} from '../controller/users.js';

const usersRouters = express.Router();


usersRouters.get('/',getHome);


export default usersRouters;