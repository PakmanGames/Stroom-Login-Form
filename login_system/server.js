const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
const app = express();
const mongoose = require('mongoose');

const router = require('./router');

const uri = 'APIStringHere';

async function connect() {
    try {
        // await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch(error) {
        console.log('Error: ', error);
    }
}

connect();

const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/', router);

// Load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

// Home Route
app.get(`/`, (req, res) => {
    res.render('base', { title: "Login System"});
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});