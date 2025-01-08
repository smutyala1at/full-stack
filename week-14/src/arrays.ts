// given a list of users, filter out the users who are legal (greater than 18 years of age)

interface People {
    firstName: string;
    lastName: string;
    age: number
}

let users: People[] = [
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
]
const legalUsers = (users: People[]) => {
    return users.filter(user => user.age >= 18)
}

console.log(legalUsers(users))