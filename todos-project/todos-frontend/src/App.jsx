import { useState } from "react"
import InputBox from "./components/InputBox"

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  // handleChange is a function that takes an attribute and returns a function that takes a new value to update the form data
  const handleChange = (attribute) => (newVal) => {
    // setFormData is a function that take a function that takes the previous state and returns the new state to setFormData function which updates the form data
    setFormData((prev) => ({
      ...prev,
      [attribute]: newVal
    }))
  }

  return (
    <>
      <div className="bg-zinc-900 w-full h-screen flex flex-col justify-center items-center">
        <InputBox label="First Name" placeholder="first name" value={formData.firstName} onChange={handleChange("firstName")} error="oy! something went wrong" />
        <InputBox label="Last Name" placeholder="last name" value={formData.lastName} onChange={handleChange("lastName")} error="" />
        <InputBox label="Email" placeholder="email" value={formData.email} onChange={handleChange("email")} error="" />
        <InputBox label="Password" type="password" placeholder="password" value={formData.password} onChange={handleChange("password")} error="" />
      </div>
    </>
  )
}

export default App
