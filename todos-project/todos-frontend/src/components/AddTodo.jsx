import { useState } from 'react';
import axios from 'axios';

export default function AddTodo() {

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

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/todo", data);
        } catch (error) {
            const errors = {};
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
        <div>
            <InputBox type="text" label="Title" placeholder="Title" value={data.title} onChange={handleChange("title")} error={errors.title} />
            <InputBox type="text" label="Description" placeholder="Description" value={data.description} onChange={handleChange("description")} error={errors.description} />
        </div>
    )
}