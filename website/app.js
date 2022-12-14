/* Global Variables */


const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '&appid=19c1ee89bb6aeafa35e8b4efcc83e5c7';
const params = '&units=metric';

let userFeeling = '';

const dataToPost = {}

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e) {
    const zipCode ='zip='+ document.getElementById('zip').value;
    userFeeling = document.getElementById('feelings').value;
    getData(baseURL, zipCode, apiKey, params)
    .then((data) => {
        postData('/post-data', data)
        .then(updateUI());
    })
}


//Get data that returns the temperature from the API
const getData = async (baseURL, zip, apiKey, params) => {
    const response = await fetch(baseURL+zip+apiKey+params);
    try {
        const data = await response.json();
        let temperature = data.main.temp;
        let date = newDate;
        dataObject = {
            temp: temperature,
            date: date,
            userFeeling: userFeeling,
        }
        return dataObject;
    } catch (error) {
        console.log('error', error);
    }
};

//Post the data to the server side
const postData = async (url = '', data= {})=> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp, date: data.date, userFeeling:data.userFeeling
        })
    });

    try {
        
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error.response.data);
    }
};


const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const dataRetrieved = await request.json();
        document.getElementById('date').innerHTML = dataRetrieved.date;
        document.getElementById('temp').innerHTML = Math.round(dataRetrieved.temp) + ' degrees';
        document.getElementById('content').innerHTML = dataRetrieved.userFeeling;

    } catch (error) {
        console.log('error', error);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();