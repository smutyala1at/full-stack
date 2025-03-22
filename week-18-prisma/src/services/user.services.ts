import { client } from "..";
import { DatabaseError, DuplicateResourceError, NotFoundError, ValidationError } from "../errors/custom.errors";
import { User, ValidationErrorItem } from "../types/types";
import { userLoginSchema, userSignupSchema } from "../validations/user.validations";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const findUser = async (email: string): Promise<User | null> => {
    const user = await client.user.findFirst({
        where: {
            email: email
        }
    })

    return user;
}

export const createUser = async (userInput: User): Promise<void> => {
    try {
        const { success, error } = userSignupSchema.safeParse(userInput);

        if(error){
            const errors: ValidationErrorItem[] = error.errors.map((err) => ({ path: err.path[0] as string, message: err.message as string}))
            throw new ValidationError(errors);
        }
        
        const { email, password } = userInput;
        const user = await findUser(email);

        if(user){
            throw new DuplicateResourceError("User already exists");
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 5);

        await client.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })
        return;
    } catch (error) {
        if(error instanceof ValidationError || error instanceof DuplicateResourceError){
            throw error;
        }

        throw new DatabaseError("Error creating user");
    }
}


export const login = async (userInput: User): Promise<string> => {
    try {
        const { success, error } = userLoginSchema.safeParse(userInput);

        if(error){
            const errors: ValidationErrorItem[] = error.errors.map((err) => ({ path: err.path[0] as string, message: err.message as string}))
            throw new ValidationError(errors);
        }

        const { email, password } = userInput;

        // check if user exists
        const user = await findUser(email);
        if(!user) {
            throw new NotFoundError("User does not exists");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new ValidationError([{ path: "password", message: "Invalid password"}]);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1hr" });
        return token;
    } catch(error){
        if(error instanceof ValidationError || error instanceof NotFoundError){
            throw error;
        }

        throw new DatabaseError("Error loggin in");
    }
}