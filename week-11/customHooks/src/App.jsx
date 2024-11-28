import { useState } from 'react'
import { useFetch }from './hooks/UseFetchHook'
import { usePrev } from './hooks/UsePrevHook';
import { useDebounce } from './hooks/UseDebounceHook';

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
  const [anything, setAnything]= useState(1)
  const {post, loading} = useFetch('https://jsonplaceholder.typicode.com/todos/' + currentPost, 10);
  const prevPost = usePrev(post);

  if(loading){
    return <div>Loading....</div>
  } 

  return (
    <div>
      <button onClick={() => setCurrentPost(1)}>Post 1</button>
      <button onClick={() => setCurrentPost(2)}>Post 2</button>
      <button onClick={() => setCurrentPost(3)}>Post 3</button>
      <button onClick={() => setAnything(c => c + 1)}>rerender</button>
      <div>
        {JSON.stringify(post)}
      </div>
      <div>
        Previous post: {JSON.stringify(prevPost)}
      </div>
    </div>
  )
}

function Search(){
  const [inputVal, setInputVal] = useState("");
  const debouncedResponse = useDebounce(inputVal, 2); 

  function handleInputChange(e){
    setInputVal(e.target.value);
  }

  return (
  <div>
    <input onInput={handleInputChange} type="text" placeholder='search'/>
    <div>
      {debouncedResponse}
    </div>
  </div>
  )
}

function App(){
  return <>
    <Counter />
    <FetchPost />
    <Search />
  </>
}

export default App
