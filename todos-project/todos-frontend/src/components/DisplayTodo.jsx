import TodoButton from "./TodoButton";

export default function DisplayTodo({
    todo
}) {
    return (
        <div className="flex justify-center">
            <div className="bg-white w-[928px] rounded-lg m-8">
                <div className="flex justify-between text-zinc-900 p-8">
                    <div className="flex flex-col gap-4">
                        <p className="font-bold">{todo.title}</p>
                        <p>{todo.description}</p>
                        <p>Completed: {todo.completed.toString()}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <TodoButton label="Edit" onClick="" />
                        <TodoButton label="Delete" onClick="" />
                    </div>
                </div>
            </div>
        </div>
    )
}