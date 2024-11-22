

function App() {

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
}

export default App
