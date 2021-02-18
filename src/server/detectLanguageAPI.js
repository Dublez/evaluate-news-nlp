// Package to work with environment variables
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');
/* Global Variables */
//Base URL for MeaningCloud API 
const baseURL = 'https://ws.detectlanguage.com/0.2/detect';

// Personal API Key for OpenWeatherMap API
let headers = {
    Authorization: 'Bearer '+process.env.DETECTLANGUAGE_KEY,
}


/* Function to POST data */
const postDetectLanguageServerData = async (url='') => {
    const res = await fetch(url, {
        method: 'POST',
        headers: headers
    });
    try {
        const analysisResult = await res.json();
        return analysisResult;
    } catch (error) {
        console.log('error', error);
    }
};

const fetchDetectLanguageAPIData = async function(textForAnalysis){
    let result = postDetectLanguageServerData(baseURL+"?q="+textForAnalysis);
    return result;
}

module.exports = fetchDetectLanguageAPIData;