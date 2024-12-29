import Checkbox from "./Checkbox";
import TodoButton from "./TodoButton";

export default function DisplayTodo({
    todo,
    onDelete,
    onCheck
}) {

    return (
        <div className="flex justify-center">
            <div className="bg-white w-[928px] rounded-lg mb-8">
                <div className="flex justify-between text-zinc-900 p-8">
                    <div className="flex flex-col gap-4">
                        <p>{todo.title}</p>
                        <p>{todo.description}</p>
                        <Checkbox label="Completed" onChange={onCheck} isChecked={todo.completed} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <TodoButton label="Edit" onClick="" />
                        <TodoButton label="Delete" onClick={onDelete} />
                    </div>
                </div>
            </div>
        </div>
    )
}