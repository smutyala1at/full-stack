import DisplayTodos from '../components/DisplayTodos';
import Header from '../components/Header';

export default function HomePage() {
    return (
        <div className="bg-zinc-900 w-full min-h-screen">
            <Header />
            <DisplayTodos />
        </div>
    )
}