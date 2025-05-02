export interface User {
    id?: number;
    email: string;
    password: string;
}

export type UserEmail = Pick<User, "email">;

export interface ValidationErrorItem {
    path: string;
    message: string;
}

export interface Tokenpayload {
    id: number;
    iat: number;
    exp: number;
}

export interface Todo {
    id?: number;
    title: string;
    description: string;
    done?: boolean;
    userId: number;
}