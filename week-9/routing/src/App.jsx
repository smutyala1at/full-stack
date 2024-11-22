import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';


function App() {

  return (
    <>
      <BrowserRouter>
        <Link to="/">Allen</Link>
        |
        <Link to="/neet/online-coaching-class-11">Class 11</Link>
        |
        <Link to="/neet/online-coaching-class-12">Class 12</Link>
        <Routes>
          <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
          <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

function Class11Program(){
  return <h1>Neet programs for class 11</h1>
}

function Class12Program(){

  const navigate = useNavigate();

  useEffect(function(){
    setTimeout(function(){
      console.log("in setTimeout");
      return navigate("/");
    }, 2000);

    return function(){
      console.log("useEffect unmounted"); /* After 2 seconds page will be redirected to Landing page, that means current page while be unmounted, because useEffect run on mount and unmounting, this will be logged */
    }
  }, []);

  return <h1>Neet programs for class 12</h1>
}

function Landing(){
  return <h1>Allen Landing Page</h1>
}

export default App
