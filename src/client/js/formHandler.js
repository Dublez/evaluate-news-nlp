function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText);

    console.log("::: Form Submitted :::");

    const postServerData = async (url='', text) => {
        // 
        const body = JSON.stringify(text);
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

    postServerData('http://localhost:8080/test', formText)
    // 
    // .then(res => console.log(res))
    // .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = "Confidence: "+ res.json.confidence;
    });
        
}

export { handleSubmit }
