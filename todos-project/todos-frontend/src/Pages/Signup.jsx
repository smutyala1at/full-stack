import { useState } from "react"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import axios from "axios"

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
            console.log("Form data:", formData)
            const response = await axios.post("http://localhost:3000/user/signup", formData)
            print(response.data)
            if (response.data) {
                console.log("Signup successful:", response.data);
            }
        } catch (error) {
            const formErrors = {}
            if(Array.isArray(error.response.data.message)) {
                console.log(error.response.data.message)
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
            <InputBox label="First Name" placeholder="first name" value={formData.firstName} onChange={handleChange("firstName")} error={errors.firstName} />
            <InputBox label="Last Name" placeholder="last name" value={formData.lastName} onChange={handleChange("lastName")} error={errors.lastName} />
            <InputBox label="Email" placeholder="email" value={formData.email} onChange={handleChange("email")} error={errors.email} />
            <InputBox label="Password" type="password" placeholder="password" value={formData.password} onChange={handleChange("password")} error={errors.password} />
            {(errors.customError) &&
                (<p className="text-sm text-red-500 mb-2">{errors.customError}</p>)
            }
            <Button label="Submit" onClick={handleSubmit} />
      </div>
    )
}