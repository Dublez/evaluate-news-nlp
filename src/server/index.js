var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const apiResponse = require('./api.js')


// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Static folder for client files
app.use(express.static('dist'))

// Moment library to get current date
moment = require('moment');

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

class Resp {
    constructor(date, text, language, confidence, agreement, subjectivity, irony){
        this.date = date;
        this.text = text;
        this.language = language;
        this.confidence = confidence;
        this.agreement = agreement;
        this.subjectivity = subjectivity;
        this.irony = irony;
    }
}

let data = [];

app.post('/test', function (req, res) {
    // 
    console.log(req.body);
    apiResponse(req.body.input)
        .then(function (u) {
            console.log(u); 
            const obj = new Resp(
                moment().format('Do MMMM YYYY on h:mm:ss a'),
                req.body.input,
                "English",
                u.confidence,
                u.agreement,
                u.subjectivity,
                u.irony 
                );
            data.unshift(obj);
            return data;})
        .then(u => res.send({"json": u}))  
})
