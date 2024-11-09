const fs = require('fs')

// promisified readFile
function readFilePromisified(filepath){
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if(data) resolve(data);
            else reject(err);
        })
    })
}

function displayData(data){
    console.log(data);
}

function displayError(err){
    console.log(err)
}


// promisified writeFile
function writeFilePromisified(filepath){
    return new Promise((resolve, reject) => {
        fs.appendFile(filepath, '\nwriting to the file', (err) => {
            if(err) reject(err);
            resolve();
        })
    })
}

function displayDone(){
    console.log('writing done!');
}

function displayError(err){
    console.log(err);
}

writeFilePromisified('sample.txt').then(displayDone).catch(displayError);
readFilePromisified('sample.txt').then(displayData).catch(displayError);


// fetch data from api
function fetchPromisified(url){
     return new Promise(async (resolve) => {
        const response = await fetch(url);
        const data = await response.json();
        if(data) resolve(data);
     })
}

function displayApiData(data){
    console.log(data);
}

fetchPromisified('https://api.sampleapis.com/wines/reds').then(displayApiData);