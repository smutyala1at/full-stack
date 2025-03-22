import { ValidationErrorItem } from "../types/types";

export class ValidationError extends Error {
    public errors: ValidationErrorItem[];

    constructor(errors: ValidationErrorItem[]){
        super(errors[0].message)
        this.errors = errors;
        this.name = "Validation Error"
    }
}


export class DuplicateResourceError extends Error {
    constructor(message: string){
        super(message);
        this.name = "Duplicate Resource Error"
    }
}


export class NotFoundError extends Error {
    constructor(message: string){
        super(message);
        this.name = "Not Found Error"
    }
}


export class DatabaseError extends Error {
    constructor(message: string){
        super(message);
        this.name = "Database Error"
    }
}


export class AuthenticationError extends Error {
    constructor(message: string){
        super(message);
        this.name = "Authentication Error"
    }
}