
import AddTodo from '../components/AddTodo';
import DisplayTodos from '../components/DisplayTodos';
import Header from '../components/Header';

export default function HomePage() {

    const todo = {
        title: "title",
        description: "description",
        completed: "True"
    }

    return (
        <div className="bg-zinc-900 w-full min-h-screen">
            <Header />
            <AddTodo />
            <DisplayTodos />
        </div>
    )
}