// interfaces vs types
// create two types called User and Admin
// create a function that either accepts a User or an Admin as an input, and returns a string saying "Welcome, [name]"
function greet(user) {
    return "Welcome, ".concat(user.name);
}
console.log(greet({ name: "Santosh", age: 24 }));
var employee = {
    name: "Santosh",
    age: 24,
    address: [{
            city: "Berlin",
            pincode: 12345,
            country: "Germany"
        }]
};
console.log(employee.address[0].city);
// takes users and return sum of their age
function sumOfAges(user1, user2) {
    return user1.age + user2.age;
}
console.log(sumOfAges({ name: "Santosh", age: 24 }, { name: "John", age: 25 }));
