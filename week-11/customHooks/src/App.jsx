import { useState } from 'react'

// custom hook
function useCounter(){
  const [value, setValue] = useState(0);

  function increaseCount(){
    setValue(currentVal => currentVal + 1);
  }

  return {
    count: value,
    increaseCount
  }
}

function Counter() {
  const {count, increaseCount} = useCounter()

  return (
    <div>
      <button onClick={increaseCount}>Increase {count}</button>
    </div>
  )
}

function App(){
  return <>
    <Counter />
    <Counter />
    <Counter />
    <Counter />
  </>
}

export default App
