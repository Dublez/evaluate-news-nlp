// Package to work with environment variables
const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');
/* Global Variables */
//Base URL for MeaningCloud API 
const baseURL = 'http://api.meaningcloud.com/sentiment-2.1?lang=';

// Personal API Key for OpenWeatherMap API
const key = '&key='+process.env.MEANINGCLOUD_KEY;

/* Function to POST data */
const postMeaningCloudServerData = async (url='') => {
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

const fetchMeaningCloudAPIData = async function(lang, textForAnalysis){
    let result = postMeaningCloudServerData(baseURL+lang+key+"&txt="+textForAnalysis);
    return result;
}

module.exports = fetchMeaningCloudAPIData;
