var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const meaningcloudAPIResponse = require('./meaningcloudAPI.js')
const detectLanguageAPIResponse = require('./detectLanguageAPI.js')
const getLanguageName = require('./getLangName.js')


// Start up an instance of app
const app = express();
const PORT = process.env.PORT || 8080;

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
    res.sendFile('../../dist/index.html');
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
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

app.post('/test', async function (req, res) {
    // 
    console.log(req.body);
    const str = encodeURI(req.body.input);
    const u0 = await detectLanguageAPIResponse(str)
    const lang = u0.data.detections[0].language;
    const langName = getLanguageName(lang);
    
    console.log(langName);
    console.log(lang);
    const u = await meaningcloudAPIResponse(lang, str);
    // 
    console.log(u); 
    const obj = new Resp(
        moment().format('Do MMMM YYYY on h:mm:ss a'),
        req.body.input,
        langName,
        // lang,
        u.confidence,
        u.agreement,
        u.subjectivity,
        u.irony 
        );
    data.unshift(obj);
    res.send({"json": data});  
})
