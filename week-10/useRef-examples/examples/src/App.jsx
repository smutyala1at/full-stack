
import { useState, useRef } from 'react'


function App() {
  const [count, setCount] = useState(0)
  const clockRef = useRef(null); 
  /* useRef return object with "current" property, and why we use this is, useRef persists over re-renders and you could use useState, but downside of it is, whenever the values changes, it does unnecessary re-render  */

  function startClock(){
    /* usually react doesn't go crazy although we are using setInterval here, because it is only triggered when we click on start button,
    when re-rendering, it can't invoke a function. But it does go crazy if we click on start button several times  */

    /* use useRef WHEN YOU ARE MANAGING NOT UI ELEMENTS. HERE REF
    ERENCE TO CLEARINTERVAL IS NOT BEING USED IN THE UI*/

    if(clockRef.current) return  /* return if the clock is already running, to prevent unnecessary clocks */

    clockRef.current = setInterval(function(){
      setCount(c => c + 1);
    }, 1000);
  }

  function stopClock(){
    clearInterval(clockRef.current);
    clockRef.current = null; // update reference to null, so that user can start again 
  }

  return (
    <>
     <h1>{count}</h1>
     <button onClick={startClock}>start</button>
     <button onClick={stopClock}>stop</button>
    </>
  )
}

/* 
  function App(){
    const [time, setTime] = useState(0);
    const [ref, setRef] = useState(null);
  
    function startTimer(){
  
      if(ref) return;
  
      let timerRef;
      timerRef = setInterval(function(){
        setTime(time => time + 1);
      }, 1000);
      setRef(timerRef);
    }
  
    function stopTimer(){
      clearInterval(ref);
      setRef(null);
    }
  
    return(
      <>
        <h1>{time}</h1>
        <button onClick={startTimer}>start</button>
        <button onClick={stopTimer}>stop</button>
      </>
    )
  }
 */

export default App
