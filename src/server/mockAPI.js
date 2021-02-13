// Package to work with environment variables
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');
/* Global Variables */
//Base URL for MeaningCloud API 
const baseURL = 'http://api.meaningcloud.com/sentiment-2.1?lang=en';

// Personal API Key for OpenWeatherMap API
const key = '&key='+process.env.API_KEY;

/* Function to POST data */
const postServerData = async (url='') => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {},
        maxRedirects: 20
    });
    try {
        const analysisResult = await res.json();
        return analysisResult;
    } catch (error) {
        console.log('error', error);
    }
};

const fetchAPIData = async function(textForAnalysis){
    let result = postServerData(baseURL+key+"&txt="+textForAnalysis);
    return result;
}

module.exports = fetchAPIData;
