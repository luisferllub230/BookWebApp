import express from 'express';
import expressHbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import tr from './model/TRelations.js';
import BookWebApp from "./dataBase/BookWebApp.js";
import {dirname} from 'path';
import {fileURLToPath} from 'url';

//initialize express
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configure express-handlebars
app.engine('hbs', expressHbs.engine({
    layoutsDir: 'view/layout',
}));
app.set('view engine', 'hbs');
app.set('views',__dirname, 'view');

//configure static files
app.use(express.static(path.join(__dirname, 'public')));

//routes


//tables relations
tr();

//launch server and create or update database
BookWebApp.sync({/*force:true*/}).then(()=>app.listen(5500)).catch(err =>console.log(err));