
import AddTodo from '../components/AddTodo';
import DisplayTodo from '../components/DisplayTodo';
import Header from '../components/Header';

export default function HomePage() {

    const todo = {
        title: "title",
        description: "description",
        completed: "True"
    }

    return (
        <div className="bg-zinc-900 w-full h-screen">
            <Header />
            <AddTodo />
            <DisplayTodo todo={todo} />
        </div>
    )
}