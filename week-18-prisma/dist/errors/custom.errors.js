"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = exports.DatabaseError = exports.NotFoundError = exports.DuplicateResourceError = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(errors) {
        super(errors[0].message);
        this.errors = errors;
        this.name = "Validation Error";
    }
}
exports.ValidationError = ValidationError;
class DuplicateResourceError extends Error {
    constructor(message) {
        super(message);
        this.name = "Duplicate Resource Error";
    }
}
exports.DuplicateResourceError = DuplicateResourceError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "Not Found Error";
    }
}
exports.NotFoundError = NotFoundError;
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "Database Error";
    }
}
exports.DatabaseError = DatabaseError;
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "Authentication Error";
    }
}
exports.AuthenticationError = AuthenticationError;
