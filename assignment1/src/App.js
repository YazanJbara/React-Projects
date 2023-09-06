import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  /*  one way to update the state is give it a function outside the return then give it a setter function then pass it to onClick
  function handleIncr() {
  //   setCount(count + 1);
  // }
  // function handlDecr () {
    setCount (count-1)
  } */
// another way to do this is to make an inline function (arrow function)
  return (
    <div>
      <h3> {count}</h3>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default App;
