import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="w-full h-16 px-24 bg-zinc-800 text-white shadow-lg flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
                Todo<span className="text-green-300 italic">App</span>
            </Link>
            <div className="text-lg font-medium flex space-x-16">
                <Link to="/tasks/completed" className="hover:underline underline-offset-4 decoration-green-300 decoration-4">Completed</Link>
                <Link to="/profile" className="hover:underline underline-offset-4 decoration-green-300 decoration-4">Profile</Link>
            </div>
        </div>
    )
}