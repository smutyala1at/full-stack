import { useState } from "react";
import Checkbox from "./Checkbox";
import TodoButton from "./TodoButton";

export default function DisplayTodo({
    todo,
    onDelete,
    onCheck,
    onUpdate
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(todo);

    const handleEditing = async () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }
        onUpdate(currentTodo);
        setIsEditing(false);        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTodo((prev) => ({
            ...prev,
            [name]: value
        })
    )}


    return (
        <div className="flex justify-center">
            <div className="bg-white w-[928px] rounded-lg mb-8">
                <div className="flex justify-between text-zinc-900 p-8">
                    <div className="flex flex-col gap-4 w-full">
                        { isEditing ? (
                            <div className="flex flex-col gap-4">
                                <input name="title" className="border border-gray-300 rounded-lg px-4 py-3" value={currentTodo.title} onChange={handleChange} />
                                <textarea name="description" className="border border-gray-300 rounded-lg px-4 py-3" value={currentTodo.description} onChange={handleChange} />
                            </div>

                        ) : (
                            <div className="flex flex-col gap-4">
                                <p><span className="font-bold text-lg italic">Title:</span> {todo.title}</p>
                                <p><span className="font-bold text-lg italic">Description: </span>{todo.description}</p>
                            </div>
                        )

                        }
                        <Checkbox label="Completed" onChange={onCheck} isChecked={todo.completed} />
                    </div>
                    <div className="flex flex-col gap-4 ml-4">
                        <TodoButton label={`${isEditing ? 'Save' : 'Edit'}`} onClick={handleEditing} />
                        <TodoButton label="Delete" onClick={onDelete} />
                    </div>
                </div>
            </div>
        </div>
    )
}