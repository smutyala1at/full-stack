import { useState } from 'react';
import axios from 'axios';
import InputBox from './InputBox';
import TodoButton from './TodoButton';
import { useNavigate } from 'react-router-dom';

export default function AddTodo({ onTodoAdded }) {
    const navigate = useNavigate();
    
    const [data, setData] = useState({
        title: "",
        description: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        customError: ""
    })

    const handleChange = (attribute) => (newVal) => {
        setData((prev) => ({
            ...prev,
            [attribute]: newVal
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/todo", data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            onTodoAdded();
        } catch (error) {
            const errors = {};
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }

            if(Array.isArray(error.response.data.message)) {
                error.response.data.message.forEach((err) => {
                    if(!errors[err.path[0]]) errors[err.path[0]] = err.message;
                })   
                setErrors(errors);
            } else {
                setErrors({customError: error.response.data.message});
            }
        }
    }

    return (
        <div className="flex flex-col gap-4 m-4 md:gap-16 md:m-16 md:flex md:flex-row justify-center">
            <InputBox type="text" placeholder="Title" value={data.title} onChange={handleChange("title")} error={errors.title} />
            <InputBox type="text" placeholder="Description" value={data.description} onChange={handleChange("description")} error={errors.description} />
            <TodoButton label="Add Todo" onClick={handleSubmit} />
        </div>
    )
}