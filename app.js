const express = require('express');
const {
    createServer
} = require('http');
const body_parser = require('body-parser');

const { VerifyToken } = require('./helpers/Helper.JWT');

const session = require('express-session');


require('dotenv').config();
require('./config.ConnectDB');

const app = express();



//const HttpServer = createServer(app);


app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

app.use(session({
    secret: '1234lkja45',
    saveUninitialized: false,
    resave: true
}));


const auth = require('./routes/route.auth');
const user = require('./routes/route.user');

app.post('/test', (req, res) => {
    console.log(req.body);
});

app.use('/api/auth', auth);
app.use('/api/user', VerifyToken, user);




app.listen(process.env.PORT || 8000, () => {
    console.log(`localhost:${process.env.PORT || 8000}`);
})