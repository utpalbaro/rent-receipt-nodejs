'use strict'


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const dateutils = require('./util_modules/dateutils/dateutils');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

// To process the get function
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public/html/','form.html'));
});

// To process the post function
app.post('/', function (req, res) {
    /* key: value pairs. key is the variable in ejs file
    *  value is obtained from the id in form.html file
    */
    let datesInBetween = dateutils.getDatesBetweenDates( new Date(req.body.start_date), 
                                                new Date(req.body.end_date), 
                                                req.body.frequency);

    res.render('receipt', { dates: datesInBetween,
                            amount: req.body.amount,
                            tenant: req.body.tenant,
                            address: req.body.address,
                            owner: req.body.owner,
                            });
});

app.listen(8080, () => {
    console.log('Server listening at port 8080');
});