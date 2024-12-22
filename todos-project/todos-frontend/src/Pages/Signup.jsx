import { useState } from "react"
import { Link } from "react-router-dom"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import axios from "axios"
import Heading from "../components/Heading"

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        customError: ""
    })
    
    // handleChange is a function that takes an attribute and returns a function that takes a new value to update the form data
    const handleChange = (attribute) => (newVal) => {
        // setFormData is a function that take a function that takes the previous state and returns the new state to setFormData function which updates the form data
        setFormData((prev) => ({
            ...prev,
            [attribute]: newVal
        }))
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/user/signup", formData)
            print(response.data)
            if (response.data) {
                // redirect to successful signup page with login link
            }
        } catch (error) {
            const formErrors = {}
            if(Array.isArray(error.response.data.message)) {
                error.response.data.message.forEach((error) => {
                    if(!formErrors[error.path[0]]) formErrors[error.path[0]] = error.message
                })
                setErrors(formErrors)
            }
            else {
                setErrors({
                    customError: error.response.data.message
                })
            }
            
        }
    }

    return (
        <div className="bg-zinc-900 w-full h-screen flex flex-col justify-center items-center">
            <div className="p-6 border rounded-lg shadow-lg bg-white">
                <Heading title="Signup" subtitle="Let's get started!" />
                <InputBox label="First Name" placeholder="First Name" value={formData.firstName} onChange={handleChange("firstName")} error={errors.firstName} />
                <InputBox label="Last Name" placeholder="Last Name" value={formData.lastName} onChange={handleChange("lastName")} error={errors.lastName} />
                <InputBox label="Email" placeholder="Email" value={formData.email} onChange={handleChange("email")} error={errors.email} />
                <InputBox label="Password" type="password" placeholder="Password" value={formData.password} onChange={handleChange("password")} error={errors.password} />
                {(errors.customError) &&
                    (<p className="text-sm text-red-500 mb-2">{errors.customError}</p>)
                }
                <Button label="Submit" onClick={handleSubmit} />
                <div className="flex flex-col items-center">
                    <p className="text-sm text-black mt-2">
                        Already have an account? 
                        <Link to="/login" className="text-sky-500 underline decoration-sky-500 px-1 font-bold">Login</Link>
                    </p>
                </div>
            </div>
      </div>
    )
}