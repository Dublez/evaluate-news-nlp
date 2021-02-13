import { handleSubmit, getFormText, postServerData, renderResult } from '../src/client/js/formHandler';
import 'regenerator-runtime/runtime';
// const fetch = require("node-fetch");


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
        '<section>'+
            '<form class="" onsubmit="return Client.handleSubmit(event)">'+
                '<input id="name" type="text" name="input" value="Hello" onblur="onBlur()" placeholder="Name">'+
                '<input type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">'+
            '</form>'+
        '</section>'+
        '<section>'+
            '<strong>Form Results:</strong>'+
            '<div id="results">"Confidence: 100"</div>'+
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

    test("Testing the getFormText function", () => {
        document.body.innerHTML =
        '<section>'+
            '<form class="" onsubmit="return Client.handleSubmit(event)">'+
                '<input id="name" type="text" name="input" value="" onblur="onBlur()" placeholder="Name">'+
                '<input type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">'+
            '</form>'+
        '</section>'

        expect(getFormText).toBeDefined();
        const text = "Hello"; 
        document.getElementById('name').value = text;
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

    test("Testing the renderResunts function", () => {
        document.body.innerHTML =
        '<section>'+
            '<form class="" onsubmit="return Client.handleSubmit(event)">'+
                '<input id="name" type="text" name="input" value="Hello" onblur="onBlur()" placeholder="Name">'+
                '<input type="submit" name="" value="submit" onclick="return Client.handleSubmit(event)" onsubmit="return handleSubmit(event)">'+
            '</form>'+
        '</section>'+
        '<section>'+
            '<strong>Form Results:</strong>'+
            '<div id="results"></div>'+
        '</section>';
        
        let renderResult2 = jest.fn(() => {
            renderResult(
            {
                json:{
                    confidence: 100
                }
            })
        });
        renderResult2();
        expect(document.getElementById('results').innerHTML).toEqual("Confidence: 100");
    });
})