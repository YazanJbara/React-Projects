import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAdditems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleCheck(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAdditems={handleAdditems} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onCheck={handleCheck}
      />
      <Stats />
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

function Form({ onAdditems }) {
  // we need a piece of state 1#
  const [description, setDesc] = useState("");
  const [quantity, setQuantity] = useState(1);

  // the new state depends on the current state therefore we need to pass callback
  //we are not allowed to mutate state
  // items should be added in packing list component
  // so we need to lift the state up to the closest parent of the component which is the App

  function handleSubmit(eventBehave) {
    eventBehave.preventDefault(eventBehave);
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now };
    console.log(newItem);
    onAdditems(newItem);
    setDesc("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do You Need For Your👌Trip?</h3>
      <select
        value={quantity}
        onChange={(eventBehave) =>
          setQuantity(Number(eventBehave.target.value))
        }
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* use the state in input filed #2 */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(eventBehave) => setDesc(eventBehave.target.value)}
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
        value={item.packed}
        onChange={() => onCheck(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💕You Have X items on your list and you already packed X (X%)</em>
    </footer>
  );
}
