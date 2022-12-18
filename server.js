const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(express.static('public'))
const PORT = 3000;
const urlEncodedParser = express.urlencoded({extended: false});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: 'СЮДА EMAIL',
        pass: 'СЮДА СГЕНЕРИРОВАННЫЙ ПАРОЛЬ'
    }
})


app.get('/', (req, res) => {
    res.render(__dirname + 'public/index.html');
})
app.post('/', urlEncodedParser, (req, res) => {
    transporter.sendMail({
        from: 'ilsur2000.2016@gmail.com',
        to: req.body.mail,
        subject: 'Message from NodeMailer',
        html: ` <h1>
                    This message sent from Node JS Server
                </h1>
                <h3>FIO: ${req.body.FIO}</h3>
                <h3>Phone number: ${req.body.phone}</h3>`
    });
    res.redirect('/');
})


app.listen(PORT, () => {
    console.log(`Server is working...`);
})