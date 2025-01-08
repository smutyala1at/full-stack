// interfaces vs types
// create two types called User and Admin
// create a function that either accepts a User or an Admin as an input, and returns a string saying "Welcome, [name]"

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