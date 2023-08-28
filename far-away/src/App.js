import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAdditems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDelete(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleCheck(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAdditems} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onCheck={handleCheck}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>⛱️ Far Away 📦</h1>;
}
// by default , for behavior is to reload the page when submit
// so always we need to disable this behavior in React apps because it is SPA
// by default , these inputs and selections have it's own state in DOM
/* instead we want to prevent this so we can use Controlled Components
which by using it we can leave all the state in one central place (in react not in DOM)
to implement this we need three steps
*/
function Form({ onAddItems }) {
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

function PackingList({ items, onDelete, onCheck }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            onCheck={onCheck}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDelete, onCheck }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed} // Use "checked" instead of "value"
        onChange={() => onCheck(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
//for calculating this stats , we need derived state not separate state
// because the number of items can be calculated from the items array itself
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start Add Items</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You Got Everything to go"
          : `💕You Have ${numItems} items on your list and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
