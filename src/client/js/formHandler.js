async function handleSubmit(event) {
    event.preventDefault();

    let formText = getFormText();
    // check what text was put into the form field
    Client.checkForName(formText);

    console.log("::: Form Submitted :::");

    try{
        postServerData('http://localhost:8080/test', formText)
            .then((res) => renderResult(res));
        return true;
    } catch{
        console.log("error during postServerData");
        return false;
    }
        
}

function getFormText(){
    return document.getElementById('name').value;
}

async function postServerData (url='', text) {
    // 
    const body = JSON.stringify(text);
    // 
    console.log(body);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"input": text})
    });
    try {
        const textAnalysisResponse = await res.json();
        return textAnalysisResponse;
    } catch (error) {
        console.log('error', error);
    }
}

function renderResult(res){
    return document.getElementById('results').innerHTML = "Confidence: "+ res.json.confidence;
}

export { handleSubmit, getFormText, postServerData, renderResult }
