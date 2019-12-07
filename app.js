var express = require('express');
var exphbs  = require('express-handlebars');

var mercadopago = require('mercadopago');

var port = process.env.PORT || 3000

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/processar_pagamento', function (req, res) {
    //console.log(req.body.ammount)
    //res.send(parseInt(req.body.installments));
    
    mercadopago.configurations.setAccessToken("TEST-7124990424423366-061121-e6cc404b003cca69090e385522bb6e9a-26216235");
    
    var payment_data = {
        transaction_amount: parseFloat(req.body.amount),
        token: req.body.token,
        description: req.body.description,
        installments: parseInt(req.body.installments),
        payment_method_id: req.body.paymentMethodId,
        payer: {
            email: req.body.email
        }
    };

    // Save and posting the payment
    mercadopago.payment.save(payment_data).then(function (data) {
        console.log(data);
        res.send(data);
    }).catch(function (error) {
        console.log(error);
    });

});

app.listen(port);

