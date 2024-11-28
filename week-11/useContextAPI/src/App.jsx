import { createContext, useContext, useState } from 'react'

const valueContext = createContext();

function App() {
  return (
    <div>
        <Parent />
    </div>
  )
}

function Parent(){
  const [count, setCount] = useState(0)

  return (
    <div>
      <valueContext.Provider value={{count, setCount}}>
        <Increase />
        <Decrease />
        <Value />
      </valueContext.Provider>
    </div>
  )
}

function Increase(){
  const {setCount} = useContext(valueContext);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increase</button>
    </div>
  )
}

function Decrease(){
  const {setCount} = useContext(valueContext);

  return (
    <div>
      <button onClick={() => setCount(c => c - 1)}>Decrease</button>
    </div>
  )
}

function Value(){
  const {count} = useContext(valueContext);

  return (
    <div>
      {count}
    </div>
  )
}

export default App
