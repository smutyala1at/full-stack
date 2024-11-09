// A promise in JavaScript is an object that represent the eventual completion (or failure) of an asynchronous operation and its resulting value
// Promise class gives you a promise, that will return you status of pending or reject or resolve
// We could use callback, but promises are cleaner

// callback
function sum(a, b){
    console.log(a+b);
}

function mainFn(a, b, callbackFn){
    return callbackFn(a, b);
}

mainFn(10, 5, sum)

// setTimeout uses callback - setTimeout(callbackFn, duration)
function logTime(){
    console.log(new Date().toLocaleString());
}

setTimeout(logTime, 2000);

// These concepts are used when y depends on x or y has to be executed after completion of x
// used to handle asynchronous operations more effectively than traditional callback functions

function main(){
    console.log("main is called");
}

function waitFor3S(resolve){
    setTimeout(resolve, 3000);
}

waitFor3S(main)

// promisfying the setTimeout function

function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

function afterDone(){
    console.log('called after promise');
}

setTimeoutPromisified(5000).then(afterDone)

// How it works? You call promisify function and when successfully executed, use .then to call afterFunction
// promises takes input has a function with parameter (resolve), and when resolve is called in that function, I will call .then(whateverFunYouWantPromiseToCall)
// fetchPromisified(fetchData).then(displayData) => promise returns eventual completion of fetchData from api and then displays it, if the promise is resolved.
