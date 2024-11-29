
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom, evenSelector } from './store/atoms/counter'


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
      <DisplayEven />
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

function DisplayEven(){
  const isEven = useRecoilValue(evenSelector);

  return (
    <div>
    {isEven ? <h1>Even</h1> : ""}
    </div>
  )
}

export default App
