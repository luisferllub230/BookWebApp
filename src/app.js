import express from 'express';
import expressHbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import tr from './model/TRelations.js';
import BookWebApp from "./dataBase/BookWebApp.js";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import UR from './routers/userRouts.js';
import AR from './routers/adminRouts.js';
import ER from './routers/errorRouts.js';

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
    layoutsDir: 'src/view/layout',
    defaultLayout: 'main-layout',
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'view'));

//configure static files
app.use(express.static(path.join(__dirname, './public')));

//routes
app.use(UR);
app.use('/admin/',AR);
app.use(ER);

//tables relations
tr();

//launch server and create or update database
BookWebApp.sync({}).then(()=>app.listen(5500)).catch(err =>console.log(err));