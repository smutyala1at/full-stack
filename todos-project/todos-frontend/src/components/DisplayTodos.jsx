import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DisplayTodo from './DisplayTodo';
import AddTodo from './AddTodo';

export default function DisplayTodos() {
    const [todos, setTodos] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const fetchTodos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/todos", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setTodos(response.data.todos);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    };

    const handleRefresh = () => {
        setRefresh(prev => !prev);
    }

    const deleteTodo = (id) => async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/todos/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.status === 200) {
                handleRefresh();
            }
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    }

    useEffect(() => {
        fetchTodos();
        return () => setTodos([]);
    }, [refresh]);

    

    return (
        <div>
            <AddTodo onTodoAdded={handleRefresh} />
            { todos.map((todo) => <DisplayTodo key={todo.id} todo={todo} onClick={deleteTodo(todo.id)} />)}
        </div>
    )
}