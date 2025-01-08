// interfaces vs types
// create two types called User and Admin
// create a function that either accepts a User or an Admin as an input, and returns a string saying "Welcome, [name]"
// Union Types (|): A value can be one of several types.
// Intersection Types (&): A value must satisfy all the combined types.

interface User {
    name: string;
    age: number;
}

interface Admin {
    name: string;
    permissions: string;
} 

type UserOrAdmin = User | Admin;

function greet (user: UserOrAdmin) : string {
    return `Welcome, ${user.name}`;
}

console.log(greet({name: "Santosh", age: 24}));


// arrays in typescript

interface Address {
    city: string;
    pincode: number;
    country: string;
}
interface Employee {
    name: string;
    age: number;
    address: Address[];
}

let employee: Employee = {
    name: "Santosh",
    age: 24,
    address: [{
        city: "Berlin",
        pincode: 12345,
        country: "Germany"
    }]
}

console.log(employee.address[0].city);

// takes users and return sum of their age
function sumOfAges(user1: User, user2: User): number {
    return user1.age + user2.age
}

console.log(sumOfAges({name: "Santosh", age: 24}, {name: "John", age: 25}));