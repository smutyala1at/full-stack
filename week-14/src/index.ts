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