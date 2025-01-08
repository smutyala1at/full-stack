// Pick allows you to pick a subset of properties from an existing type/interface.

interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    password: string;
}

type UserProfile = Pick<User, "name" | "email">;

const displayUserProfile = (user: User) : UserProfile => {
    return {
        name: user.name,
        email: user.email
    }
}

// optional properties - like zod.partial()
// Partial allows you to make properties of a type optional.
type UpdateProps = Pick<User, "name" | "age" | "email">
type UpdateUser = Partial<UpdateProps>;

const updateUserProfile = (user: UpdateUser): void => {
    // hit the db to update the user
    console.log("User update successful")
}


// readonly properties 
// when you have a configuration object that should not be altered after intialization, making it readonly ensuore its properties cannot be changed.

interface Config {
    endpoint: string;
    apiKey: string;
}

const config: Readonly<Config> = {
    endpoint: "https://api.example.com",
    apiKey: "123456"
}

// config.apiKey = "1919191" 
// error: Cannot assign to 'apiKey' because it is a read-only property.


/* --------------------------------------------------------------------------------------- */

// Record - let's you give cleaner types to objects
// We can type object as follows

interface Account {
    id: string;
    name: string
}

type Accounts = { [key: string]: Account };

const accounts: Accounts = {
    "abc123": {id: "1", name: "Santosh"},
    "xyz123": {id: "2", name: "John"}
}

// or use Record

type AccountsRecord = Record<string, Account>;

const accountsRecord : AccountsRecord = {
    "abc123": {id: "1", name: "Santosh"},
    "xyz123": {id: "2", name: "John"}
}

console.log(accountsRecord.abc123)