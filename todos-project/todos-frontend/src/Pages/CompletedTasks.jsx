
import DisplayTodos from "../components/DisplayTodos";
import Header from "../components/Header";

export default function CompletedTasks() {

    return (
        <div className="bg-zinc-900 w-full min-h-screen flex flex-col gap-16">
            <Header />
            <DisplayTodos AddComponent={false} completed={true} />
        </div>
    )
}