// interfaces vs types
// create two types called User and Admin
// create a function that either accepts a User or an Admin as an input, and returns a string saying "Welcome, [name]"
function greet(user) {
    return "Welcome, ".concat(user.name);
}
console.log(greet({ name: "Santosh", age: 24 }));
