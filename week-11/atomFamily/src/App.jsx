import { todosAtom } from "./store/atoms/todos"
import { RecoilRoot, useRecoilValueLoadable } from "recoil"


function App() {
  return (
    <RecoilRoot>
     <Todo id={1} /> 
     <Todo id={3} /> 
     <Todo id={2} /> 
    </RecoilRoot>
  )
}

function Todo({ id }) {
  const todoLoadable = useRecoilValueLoadable(todosAtom(id));

  if (todoLoadable.state === "loading") {
    return <div>Loading...</div>;
  }

  if (todoLoadable.state === "hasError") {
    return <div>Error loading todo</div>;
  }

  const todo = todoLoadable.contents; // Access the resolved value
  
  return (
    <div>
      <div>{todo.title}</div>
      <div>{todo.description}</div>
    </div>
  );
}


export default App
