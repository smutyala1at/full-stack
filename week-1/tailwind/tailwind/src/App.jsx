
import './App.css'
import Button from './components/Button'

function App() {

  return <div>
    <div className='flex justify-center bg-stone-950 h-dvh'>
      <div className='flex justify-center items-center flex-col'>
        <div>
          <h1 className='text-white text-3xl font-medium'>Let's Get Started</h1>
        </div>
        <Button disabled={false}/>
      </div>
    </div>
  </div>
}

export default App
