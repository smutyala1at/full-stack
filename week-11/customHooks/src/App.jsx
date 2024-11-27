import { useState } from 'react'
import { useFetch }from './FetchHook'

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

function FetchPost() {
  const post = useFetch('https://jsonplaceholder.typicode.com/todos/1'); 
  return (post && <div>{JSON.stringify(post)}</div>)
}

function App(){
  return <>
    <Counter />
    <FetchPost />
  </>
}

export default App
