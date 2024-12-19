

function greetings(name: string) : void {
    console.log(`Hello ${name}`);
}

greetings("santosh");


function sum(a: number, b: number) : number {
    return a + b;
}

const result: number = sum(10, 20);
console.log(result);


function isLegal(age: number) : boolean {
    return age >= 18;
}

console.log(isLegal(20));

function delayedCall(fn: () => void){
    setTimeout(fn, 1000);
}

delayedCall(function(){
    console.log("hello");
})