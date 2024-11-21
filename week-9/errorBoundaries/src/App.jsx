import React, { useEffect, useState } from 'react'

function App() {

  return (
    <>
      <ErrorBoundary>
        <Card1 />
      </ErrorBoundary>
      <Card2 />
    </>
  )
}

function Card1() {

  throw new Error('Error while rendering');

  return (
  <>
    <div style={{backgroundColor: "green", borderRadius: 20, padding: 20, margin: 20}}>
      Hello from Card1
    </div>
  </>
    
  );
}

function Card2(){
  return <div style={{ backgroundColor: 'green', borderRadius: 20, padding: 20 }}>
    Hello from Card2
  </div>
}

class ErrorBoundary extends React.Component{
  constructor(props){
    super(props); /* without this, "this" will be undefined in the constructor. React.Component is the parent class, and it has its own constructor that needs to be initialized before you can access this within your class. */
    this.state = { hasError: false};
  }

  static getDerivedStateFromError(error){
    return { hasError: true } /* we return obj instead of updating this.state.hasError because static method doesn't have access to instance based properties. And static is used because React should able to call error method directly using class ErrorBoundary.getDerivedStateFromError even before instantiation */
  }

  componentDidCatch(error, info){
    console.error("Error caught: ", error, info);
  }

  render(){
    if(this.state.hasError){
      return <div style={{backgroundColor: "red", borderRadius: 20, padding: 20, margin: 20}}>
      Somethig went wrong
      </div>
    }

    return this.props.children; // if not error, render children normally
  }

  /* Error occurs → React calls getDerivedStateFromError.
  State is updated (with hasError: true).
  React schedules a re-render of the component.
  componentDidCatch runs (for logging and side effects).
  React calls render() to render the fallback UI based on the updated state. */

}




export default App
