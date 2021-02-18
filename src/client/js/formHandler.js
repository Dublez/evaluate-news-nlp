async function handleSubmit(event) {
    event.preventDefault();

    let formText = getFormText();
    // check what text was put into the form field
    Client.checkForName(formText);

    console.log("::: Form Submitted :::");

    try{
        postServerData('http://localhost:8080/test', formText)
            .then((res) => {
                // 
                console.log(JSON.stringify(res));
                renderResult(res);
            });
        return true;
    } catch{
        console.log("error during postServerData");
        return false;
    }
        
}

function getFormText(){
    return document.getElementById('submitText').value;
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
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.innerHTML = "";
    createResultsSection(res, resultsSection);
}

function createResultsSection(jsonString, resultsSection){
    let length = jsonString.json.length;
    for(let i = 0; i < length; i++){
        let result = document.createElement('div');
        result.className = 'result';
        createTextSection(jsonString.json[i], result);
        createParamsSection(jsonString.json[i], result);
        resultsSection.appendChild(result);
    }
}

function createTextSection(jsonObject, resultContainer){
    let date = jsonObject.date;
    let text = jsonObject.text;
    const textElement = document.createElement('div');
    textElement.className = 'text';
    const tdl = document.createElement('dl');
    const tdt = document.createElement('dt');
    const sdt = document.createElement('strong');
    sdt.innerHTML = date;
    tdt.appendChild(sdt);
    tdl.appendChild(tdt);
    const tdd = document.createElement('dd');
    tdd.innerHTML = text;
    tdl.appendChild(tdd);
    textElement.appendChild(tdl);
    
    resultContainer.appendChild(textElement);
}

function createParamsSection(jsonObject, resultContainer){
    let language = jsonObject.language;
    let confidence = jsonObject.confidence;
    let agreement = jsonObject.agreement;
    let subjectivity = jsonObject.subjectivity;
    let irony = jsonObject.irony;

    const paramsElement = document.createElement('div');
    paramsElement.className = 'params';
    paramsElement.appendChild(createDl('language', 'Language:', 'languageVal', language));
    const confidenceChild = createDl('confidence', 'Confidence:', 'confidenceVal', confidence+'%');
    paramsElement.appendChild(confidenceChild);
    markConfidenceColor(confidenceChild, confidence);
    paramsElement.appendChild(createDl('agreement', 'Agreement:', 'agreementVal', agreement));
    paramsElement.appendChild(createDl('subjectivity', 'Subjectivity:', 'subjectivityVal', subjectivity));
    paramsElement.appendChild(createDl('irony', 'Irony:', 'IronyVal', irony));
    
    resultContainer.appendChild(paramsElement);

}

function createDl(mainTagClassName, description, subTagClassName, param){
    const tdl = document.createElement('dl');
    tdl.className = mainTagClassName;
    const tl = document.createElement('label');
    tdl.appendChild(tl);
    const ts = document.createElement('strong');
    ts.innerHTML = description;
    tl.appendChild(ts);
    const dd = document.createElement('dd');
    dd.className = subTagClassName;
    dd.innerHTML = param;
    tl.appendChild(dd);
    return tdl;
}

function markConfidenceColor(element, confidenceLevel){
    const el = element.querySelector('.confidenceVal');
    if(confidenceLevel >= 80){
        el.classList.add('confidenceGreen');
    } else if(confidenceLevel >= 50 && confidenceLevel < 80){
        el.classList.add('confidenceYellow');
    } else{
        el.classList.add('confidenceRed');
    }

    return el;
}

export { handleSubmit, getFormText, postServerData, renderResult, createResultsSection, createTextSection, createParamsSection, createDl }
