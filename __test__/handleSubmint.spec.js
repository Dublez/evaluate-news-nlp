import { handleSubmit, getFormText, postServerData, renderResult, createResultsSection, createTextSection, createParamsSection } from '../src/client/js/formHandler';
import 'regenerator-runtime/runtime';


// Describe function has two arguments: a string description and a test suite as a callback function.
// A test suite may contain one or more related tests

describe("Testing the submit functionality", () => {

    // The test() function has two arguments: a string description and an actual test as a callback function.
    test("Testing the handleSubmit() function", () => {
        // Define the input for the function, if any, in the form of variables/array.
        // Define the expected output, if any, in the form of of variables/array.
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output.
        // The general syntax is expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue); , where 'toEqual() is a matcher
        document.body.innerHTML =
        '<section id="submitSection">'+
            '<form class="submitForm" onsubmit="return Client.handleSubmit(event)">'+
                '<textarea id="submitText" placeholder="please insert text here" name="input" onblur="onBlur()"></textarea>'+
                '<input id="submitButton" type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">'+
            '</form>'+
        '</section>'+
        '<section id="resultsSection">'+
        '</section>';
        
        expect(handleSubmit).toBeDefined();
        const clickEvent = new MouseEvent('click');
        Object.assign(clickEvent, {preventDefault: jest.fn()});
        const formHandler = require('../src/client/js/formHandler');
        const submit = jest.spyOn(formHandler, 'handleSubmit');
        // const get = jest.spyOn(formHandler, 'getFormText');
        // const post = jest.spyOn(formHandler, 'postServerData');
        // console.log = jest.fn();
        // const mockGet = () => jest.fn();
        // jest.mock(getFormText(), () => {
        //     return {
        //         default: mockGet
        //     }
        // })
        handleSubmit(clickEvent);
        expect (submit).toHaveBeenCalledTimes(1);
        expect (clickEvent.preventDefault).toHaveBeenCalledTimes(1);
        // expect (get).toHaveBeenCalled();
        // expect (post).toHaveBeenCalled();
        // expect (console.log).toHaveBeenCalled()
        // expect (mockGet).toHaveBeenCalled();
    });

    test("Testing the getFormText() function", () => {
        document.body.innerHTML =
        '<section id="submitSection">'+
            '<form class="submitForm" onsubmit="return Client.handleSubmit(event)">'+
                '<textarea id="submitText" placeholder="please insert text here" name="input" onblur="onBlur()"></textarea>'+
                '<input id="submitButton" type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">'+
            '</form>'+
        '</section>'+
        '<section id="resultsSection">'+
        '</section>';

        expect(getFormText).toBeDefined();
        const text = "Hello"; 
        document.getElementById('submitText').value = text;
        expect(getFormText()).toEqual(text);
    });

    test("Testing the postServerData function", () => {
        expect(postServerData).toBeDefined();
        const data = postServerData('http://localhost:8080/test', "Hello")
            .then((data) => {
                console.log(data);
                return data;})
            .then((res)=>expect(res).resolves.toBeTruthy());
    });

    test("Testing the renderResunts() function", () => {
        document.body.innerHTML =
        '<section id="submitSection">'+
            '<form class="submitForm" onsubmit="return Client.handleSubmit(event)">'+
                '<textarea id="submitText" placeholder="please insert text here" name="input" onblur="onBlur()"></textarea>'+
                '<input id="submitButton" type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">'+
            '</form>'+
        '</section>'+
        '<section id="resultsSection">'+
        '</section>';
        
        let renderResult2 = jest.fn(() => {
            renderResult(
            {
                "json":
                [
                    {"date":"18th February 2021 on 4:24:48 pm",
                    "text":"Hello",
                    "language":"English",
                    "confidence":"100",
                    "agreement":"AGREEMENT",
                    "subjectivity":"OBJECTIVE",
                    "irony":"NONIRONIC"}
                ]
            })
        });
        renderResult2();
        expect(document.getElementById('resultsSection').querySelector('.text dl dd').innerHTML).toEqual("Hello");
        expect(document.getElementById('resultsSection').querySelector('.languageVal').innerHTML).toEqual("English");
        expect(document.getElementById('resultsSection').querySelector('.confidenceVal').innerHTML).toEqual("100%");
        expect(document.getElementById('resultsSection').querySelector('.agreementVal').innerHTML).toEqual("AGREEMENT");
        expect(document.getElementById('resultsSection').querySelector('.subjectivityVal').innerHTML).toEqual("OBJECTIVE");
        expect(document.getElementById('resultsSection').querySelector('.IronyVal').innerHTML).toEqual("NONIRONIC");
    });

    test('Testing the createResultsSection() function', () => {
        document.body.innerHTML =
        '<section id="submitSection">'+
            '<form class="submitForm" onsubmit="return Client.handleSubmit(event)">'+
                '<textarea id="submitText" placeholder="please insert text here" name="input" onblur="onBlur()"></textarea>'+
                '<input id="submitButton" type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">'+
            '</form>'+
        '</section>'+
        '<section id="resultsSection">'+
        '</section>';

        let createResultsSection2 = jest.fn(() => {
            createResultsSection(
            {
                "json":
                [
                    {"date":"18th February 2021 on 4:24:48 pm",
                    "text":"Hello",
                    "language":"English",
                    "confidence":"100",
                    "agreement":"AGREEMENT",
                    "subjectivity":"OBJECTIVE",
                    "irony":"NONIRONIC"}
                ]
            },
                document.querySelector('#resultsSection'));
        });
        createResultsSection2();
        expect(document.getElementById('resultsSection').querySelector('.result')).toBeDefined();
        expect(document.getElementById('resultsSection').querySelector('.text')).toBeDefined();
        expect(document.getElementById('resultsSection').querySelector('.params')).toBeDefined();
    })

    test('Testing the createTextSection() function', () => {
        document.body.innerHTML =
        '<section id="submitSection">'+
            '<form class="submitForm" onsubmit="return Client.handleSubmit(event)">'+
                '<textarea id="submitText" placeholder="please insert text here" name="input" onblur="onBlur()"></textarea>'+
                '<input id="submitButton" type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">'+
            '</form>'+
        '</section>'+
        '<section id="resultsSection">'+
            '<div class="result"></div>'+
        '</section>';

        let createTextSection2 = jest.fn(() => {
            createTextSection(
            {
                "json":
                [
                    {"date":"18th February 2021 on 4:24:48 pm",
                    "text":"Hello",
                    "language":"English",
                    "confidence":"100",
                    "agreement":"AGREEMENT",
                    "subjectivity":"OBJECTIVE",
                    "irony":"NONIRONIC"}
                ]
            },
            document.querySelector('.result')
            )
        });
        createTextSection2();
        expect(document.querySelector('.text')).toBeDefined();
        expect(document.querySelector('.text dl dd')).toBeDefined();
        // 
        expect(document.querySelector('.result').querySelector('.text dl dd').innerHTML).toEqual("Hello");
    })

    test('Testing the createParamsSection() function', () => {
        document.body.innerHTML =
        '<section id="submitSection">'+
            '<form class="submitForm" onsubmit="return Client.handleSubmit(event)">'+
                '<textarea id="submitText" placeholder="please insert text here" name="input" onblur="onBlur()"></textarea>'+
                '<input id="submitButton" type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">'+
            '</form>'+
        '</section>'+
        '<section id="resultsSection">'+
            '<div class="result"></div>'+
        '</section>';

        let createParamsSection2 = jest.fn(() => {
            createParamsSection(
            {
            "json":
                [
                    {"date":"18th February 2021 on 4:24:48 pm",
                    "text":"Hello",
                    "language":"English",
                    "confidence":"100",
                    "agreement":"AGREEMENT",
                    "subjectivity":"OBJECTIVE",
                    "irony":"NONIRONIC"}
                ]
            },
            document.querySelector('.result')
            )
        });
        createParamsSection2();
        expect(document.getElementById('resultsSection').querySelector('.params')).toBeDefined();
        expect(document.getElementById('resultsSection').querySelector('.languageVal').innerHTML).toEqual("English");
        expect(document.getElementById('resultsSection').querySelector('.confidenceVal').innerHTML).toEqual("100%");
        expect(document.getElementById('resultsSection').querySelector('.agreementVal').innerHTML).toEqual("AGREEMENT");
        expect(document.getElementById('resultsSection').querySelector('.subjectivityVal').innerHTML).toEqual("OBJECTIVE");
        expect(document.getElementById('resultsSection').querySelector('.IronyVal').innerHTML).toEqual("NONIRONIC");
    })
})