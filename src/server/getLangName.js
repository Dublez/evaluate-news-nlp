var fs = require('fs');
const path = require("path");
var res = {};

function getSupportedLanguages(){
    fs.readFile(path.resolve(__dirname, "./supportedLanguages.json"), 'utf8', function (err, data) {
        if (err) throw err;
        res = JSON.parse(data);
    });
    return res;
}

getSupportedLanguages();

function getLanguageName(langCode) {
    let result = '';
    result = res[langCode];
    return result ? result : langCode + ": N/A";
}

module.exports = getLanguageName;