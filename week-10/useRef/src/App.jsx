import { useRef } from 'react';

function App() {

  const nameRef = useRef(); /* useRef returns object { current: <value>} which held by nameRef */
  const passwordRef = useRef();

  function onSubmit(){
    console.log(nameRef.current, passwordRef.current) /* returns the HTML elements, use .value to get value of input elements  */

    if(nameRef.current.value === ""){
      nameRef.current.focus()
    } else if(passwordRef.current.value === ""){
      passwordRef.current.focus()
    }
  }

  return (
    <>
      <h1>Sign up</h1>
      <div>
        <input ref={nameRef} type="text" placeholder="name" />
      </div>
      <div>
        <input ref={passwordRef} type="text" placeholder="password" />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </>
  )
}


/* function App() {

  function onSubmit(){
    const nameElVal = document.getElementById("name").value;
    const passwordElVal = document.getElementById("password").value;

    if(nameElVal === ""){
      document.getElementById("name").focus()
    } else if(passwordElVal === ""){
      document.getElementById("password").focus()
    }
  }

  return (
    <>
      <h1>Sign up</h1>
      <div>
        <input id="name" type="text" placeholder="name" />
      </div>
      <div>
        <input id="password" type="text" placeholder="password" />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </>
  )
} */

export default App
