/*================================================*/
/*          Matt's default Node Server            */
/*================================================*/

/*----------Required Modules----------*/
const express = require('express'); //the meat
const body_parser = require('body-parser'); //the middleware
const endpoints = require('./routes.js'); //optional design choice - define endpoints in routes.js

/*----------Define app----------*/
const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));

app.use(express.static('public')) //serve files from public directory

/*----------Launch App----------*/
endpoints(app);

app.listen(8080);
