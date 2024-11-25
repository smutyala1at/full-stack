import { useState } from 'react'

function App() {

  return (
    <>
      <Lightbulb />
    </>
  )
}

function Lightbulb(){
  const [bulbStatus, setBulbStatus] = useState(true);

  return <>
    <BulbState bulbStatus={bulbStatus} />
    <ToggleBulbState setBulbStatus={setBulbStatus} />
  </>
}

function BulbState({bulbStatus}){
  return <div>
    {bulbStatus ? "Bulb on" : "Bulb off"}
  </div>
}

function ToggleBulbState({setBulbStatus}){

  function handleBulbStatus(){
    setBulbStatus(status => !status);
  }  
  
  return <div>
    <button onClick={handleBulbStatus}>Toggle the bulb</button>
  </div>
}

export default App
