

function App() {


  return (
    <>
      {/* tailwind is mobile first, grid grid-cols-1, means, only single child span over whole grid, from sm breakpoint and above grid has 12 cols */}
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        <div className="bg-blue-500 col-span-1 sm:col-span-5">
          Hello from first div
        </div>
        <div className="bg-red-500 col-span-1 sm:col-span-2">
          Hello from second div
        </div>
        <div className="bg-green-500 col-span-1 sm:col-span-5">
          Hello from third div
        </div>
      </div>
    </>
  )
}

export default App
