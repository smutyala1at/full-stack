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
  const [currentPost, setCurrentPost] = useState(1);
  const {post, loading} = useFetch('https://jsonplaceholder.typicode.com/todos/' + currentPost);
  
  if(loading){
    return <div>Loading....</div>
  }

  return (
    <div>
      <button onClick={() => setCurrentPost(1)}>Post 1</button>
      <button onClick={() => setCurrentPost(2)}>Post 2</button>
      <button onClick={() => setCurrentPost(3)}>Post 3</button>
      {JSON.stringify(post)}
    </div>
  )
}

function App(){
  return <>
    <Counter />
    <FetchPost />
  </>
}

export default App
