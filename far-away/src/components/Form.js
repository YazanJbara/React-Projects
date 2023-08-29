import { useState } from "react";

// by default , for behavior is to reload the page when submit
// so always we need to disable this behavior in React apps because it is SPA
// by default , these inputs and selections have it's own state in DOM
/* instead we want to prevent this so we can use Controlled Components
which by using it we can leave all the state in one central place (in react not in DOM)
to implement this we need three steps
*/
export default function Form({ onAddItems }) {
  // we need a piece of state 1#
  const [description, setDesc] = useState("");
  const [quantity, setQuantity] = useState(1);
  // the new state depends on the current state therefore we need to pass callback
  //we are not allowed to mutate state
  // items should be added in packing list component
  // so we need to lift the state up to the closest parent of the component which is the App
  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() }; // Added parentheses to Date.now()
    onAddItems(newItem); // Fixed function name
    setDesc("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do You Need For Your👌Trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDesc(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
