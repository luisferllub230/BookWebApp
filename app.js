import express from 'express';
import expressHbs from 'express-handlebars';
import { verify } from './src/helpers/hbs.js';
import path from 'path';
import bodyParser from 'body-parser';
import tr from './src/model/TRelations.js';
import BookWebApp from "./src/dataBase/BookWebApp.js";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import RT from './src/routers/router.js';
import multer from 'multer';
import {v4}  from 'uuid';

//initialize express
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configure static files
app.use(express.static(path.join(__dirname, './src/public')));
app.use("/img", express.static(path.join(__dirname, './img')));

//multer middleware
const storageImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'img');
    },
    filename: (req, file, cb) => {
        cb(null, `${v4()}-${file.originalname}`);
    }
});
app.use(multer({storage: storageImg}).single('bookImgPath'));

//configure express-handlebars
app.engine('hbs', expressHbs.engine({
    layoutsDir: 'src/view/layout',
    defaultLayout: 'main-layout',
    extname: 'hbs',
    helpers: {
        verify: verify
    }
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'/src/view'));

//routes
app.use(RT);

//tables relations
tr();

//launch server and create or update database
BookWebApp.sync({}).then(()=>app.listen(5500)).catch(err =>console.log(err));