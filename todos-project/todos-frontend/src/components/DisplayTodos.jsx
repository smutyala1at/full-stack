import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DisplayTodo from './DisplayTodo';

export default function DisplayTodos() {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/todos", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setTodos(response.data.todos);
            } catch {
                navigate("/login");
            }
        };
        fetchTodos();
    }, [navigate]);

    return (
        <div>
            { todos.map((todo) => <DisplayTodo key={todo.id} todo={todo} />)}
        </div>
    )
}