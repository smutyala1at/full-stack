// Pick allows you to pick a subset of properties from an existing type/interface.
var displayUserProfile = function (user) {
    return {
        name: user.name,
        email: user.email
    };
};
var updateUserProfile = function (user) {
    // hit the db to update the user
    console.log("User update successful");
};
var config = {
    endpoint: "https://api.example.com",
    apiKey: "123456"
};
var accounts = {
    "abc123": { id: "1", name: "Santosh" },
    "xyz123": { id: "2", name: "John" }
};
var accountsRecord = {
    "abc123": { id: "1", name: "Santosh" },
    "xyz123": { id: "2", name: "John" }
};
console.log(accountsRecord.abc123);
