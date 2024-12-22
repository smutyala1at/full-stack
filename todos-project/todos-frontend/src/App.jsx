import Signup from "./Pages/Signup"
import SuccessSignup from "./Pages/SuccessSignup"
import Login from "./Pages/Login"
import HomePage from "./Pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success-signup" element={<SuccessSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
