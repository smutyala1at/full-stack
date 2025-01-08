// given a list of users, filter out the users who are legal (greater than 18 years of age)
var users = [
    {
        firstName: "Jack",
        lastName: "Doe",
        age: 24
    },
    {
        firstName: "John",
        lastName: "Doe",
        age: 17
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        age: 18
    }
];
var legalUsers = function (users) {
    return users.filter(function (user) { return user.age >= 18; });
};
console.log(legalUsers(users));
