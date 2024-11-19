/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div>
      <Counter/>
    </div>
  )
}

function Counter(){
  const [count, setCount] = useState(0)

  let counter;

  // update the counter every second
  counter = setInterval(function(){
    // why we clear it? setCount triggers Counter function to rerender, which means another setInterval clock starts simultaneously with the previous clock, which causes infinite clocks over the time, and this causes glitches in rendering. So, we try to clear old clock in the rerender and then set counter to new value.
    // Is there a better way to do this? Yes, we can use useEffect hook which only runs on mount. When we place setInterval inside useEffect, one clock starts running and even when the rerender happends new clock is not invoked/started!
    clearInterval(counter);
    setCount(count => count + 1);
  }, 1000);

  return <div>
    <div>{count}</div>
  </div>
}

export default App
