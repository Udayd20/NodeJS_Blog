//Creating express server

require('dotenv').config();

const express = require('express');
const expresslayout=require('express-ejs-layouts')
const app = express();//Creats express application and it needs port also
const PORT = 5000 || process.env.PORT;//process.env.PORT is used to host on a server


app.use(express.static('public'));
//Templating engine
app.use(expresslayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',require('./server/routes/main.js'))
app.listen(PORT,()=>
{
    console.log(`App is running on port ${PORT}`);
})