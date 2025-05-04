import { client } from "..";
import { DatabaseError, ValidationError } from "../errors/custom.errors";
import { Todo, ValidationErrorItem } from "../types/types";
import { addtodoValidation } from "../validations/todos.validations";


export const addTodo = async (todo: Todo): Promise<void> => {
    try {
        const { title, description, userId } = todo;
        const { success, error } = addtodoValidation.safeParse({ title, description });

        if(error){
            const errors: ValidationErrorItem[] = error.errors.map((err) => ({ path: err.path[0] as string, message: err.message as string }));
            throw new ValidationError(errors);
        }

        await client.todo.create({
            data: {
                title,
                description,
                done: false,
                userId
            }
        })

        return;
    } catch(error){
        if(error instanceof ValidationError){
            throw error;
        }

        throw new DatabaseError("Failed to add todo");
    }
}


export const getTodos = async (userId: number): Promise<Todo[]> => {
    try {
        const todos = await client.todo.findMany({
            where: {
                userId: userId
            }
        })

        return todos;
    } catch (error){
        throw new DatabaseError("Failed to get todos");
    }
}