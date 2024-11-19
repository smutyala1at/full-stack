/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  function updateCount(setStateFn, amount) {
    setStateFn(c => c + amount);
  }

  return (
    <div>
      <Counter count={count} />
      <button onClick={() => updateCount(setCount, 1)}>Increase Count</button>
      <button onClick={() => updateCount(setCount, -1)}>Decrease Count</button>
    </div>
  );
}

function Counter(props) {
  useEffect(function () {
    console.log("on mount - empty dependency"); 
    // Runs only once when the Counter component is mounted (added to the DOM).
    // Since the dependency array is empty, it doesn't run again unless the component unmounts and mounts again.

    return function () {
      console.log("on unmount - empty dependency");
      // This cleanup runs only when the Counter component is unmounted (removed from the DOM).
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleanup on unmount.

  useEffect(function () {
    console.log("on mount or update - with dependency array");
    // Runs on the initial mount of the Counter component and whenever `props.count` changes.
    // This is useful for reacting to specific prop or state changes.

    return function () {
      console.log("cleanup before updating value from dependency array");
      // Runs before the effect is re-executed on `props.count` changes (cleanup phase).
      // Also runs when the Counter component is unmounted.
    };
  }, [props.count]); // Dependency array ensures this effect reacts to changes in `props.count`.

  return <div>Counter {props.count}</div>;
}

export default App;
