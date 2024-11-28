
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom } from './store/atoms/counter'


function App() {
  return (
    <RecoilRoot>
      <Parent />
    </RecoilRoot>
  )
}

function Parent(){
  return (
    <div>
      <CountVal />
      <Increase />
      <Decrease />
    </div>
  )
}

function CountVal(){
  const count = useRecoilValue(counterAtom) // subscribe to the atom
  return (
    <div>
      {count}
    </div>
  )
}

function Increase(){
  const setCount = useSetRecoilState(counterAtom);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increase count</button>
    </div>
  )
}

function Decrease(){
  const setCount = useSetRecoilState(counterAtom);
  return (
    <div>
      <button onClick={() => setCount(c => c - 1)}>Decrease count</button>
    </div>
  )
}

export default App
