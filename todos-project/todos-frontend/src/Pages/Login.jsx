import InputBox  from '../components/InputBox';
import Heading  from '../components/Heading';
import Button from '../components/Button';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(
    {
        heading = true,
        showSignupLink = true,
        children
    }) {
        const navigate = useNavigate()
        const [formData, setFormData] = useState({
            email: "",
            password: ""
        })

        const [errors, setErrors] = useState({
            email: "",
            password: "",
            backendError: ""
        })

        const handleChange = (attribute) => (newVal) => {
            setFormData((prev) => ({
                ...prev,
                [attribute]: newVal
            }))
        }

        const handleSubmit = async () => {
            try {
                const response = await axios.post("http://localhost:3000/user/signin", formData)
                localStorage.setItem("token", response.data.token)
                navigate('/')
            } catch (error) {
                if(Array.isArray(error.response.data.message)){
                    const formErrors = {}
                    error.response.data.message.forEach((error) => {
                        if(!formErrors[error.path[0]]) formErrors[error.path[0]] = error.message 
                    })
                    setErrors(formErrors)
                } else {
                    setErrors({
                        backendError: error.response.data.message
                    })
                }
            }
        }

        return (
            <div className="bg-zinc-900 w-full h-screen flex flex-col justify-center items-center">
                <div className="p-6 border rounded-lg shadow-lg bg-white">
                    { heading && <Heading title="Login" subtitle="Welcome back!" />}
                    { children && <div className="mb-4">{children}</div> }
                    <InputBox type="text" label="Email" placeholder="Email" value={formData.email} onChange={handleChange("email")} error={errors.email} />
                    <InputBox type="password" label="Password" placeholder="Password" value={formData.password} onChange={handleChange("password")} error={errors.password} />
                    { errors.backendError && (
                        <p className="text-sm text-red-500 mb-2">{errors.backendError}</p>
                    )}
                    <Button type="submit" label="Login" onClick={handleSubmit} />
                    { showSignupLink && (
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-black mt-2">
                                Don't have an account?
                                <Link to="/signup" className="text-sky-500 font-bold underline decoration-sky-500 px-1">Signup</Link>
                            </p>
                    </div>
                    )}
                </div>
            </div>
        )
}