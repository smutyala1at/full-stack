
import { useState, createContext, useContext, useRef } from 'react'

const timerContext = createContext();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <timerContext.Provider value={{count: count, setCount:setCount}}>
        <Timer />
      </timerContext.Provider>   
    </>
  )
}

function Timer(){
  return <>
    <DisplayTimer />
    <ToggleTimer />
    <Norenders /> 
  </>
}

function Norenders(){
  return <div>
    This component should not be rendered because this component is not using the states, yet it is re-rendered when the timer state changes.
    component will re-render if the parent component renders, regardless of whether the child component itself directly depends on any state or props.
    So the solution for this is using React.memo()
  </div>
}

function DisplayTimer(){
  const {count} = useContext(timerContext);
  return <div>
    {count}
  </div>
}

function ToggleTimer(){
  const {setCount} = useContext(timerContext);
  const timerRef = useRef(null);

  function startTimer(){

    /* if the user clicks start more than once, don't run more clocks anymore */
    if (timerRef.current !== null) return;

    timerRef.current = setInterval(function(){
      setCount(currentCount => currentCount + 1);
    }, 1000);
  }

  function stopTimer(){
    clearInterval(timerRef.current);
    /* set it to null, when user stops the timer. If not, user cannot start the timer again */
    timerRef.current = null;
  }

  return <div>
    <button onClick={startTimer}>start</button>
    <button onClick={stopTimer}>stop</button>
  </div>
}

export default App
