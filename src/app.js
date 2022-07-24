import express from 'express';
import expressHbs from 'express-handlebars';
import path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';

//initialize express
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configure express-handlebars
app.engine('hbs', expressHbs.engine({}));
app.set('view engine', 'hbs');
app.set('views',__dirname, 'view');

//configure static files
app.use(express.static(path.join(__dirname, 'public')));

//routes

app.listen(5500);