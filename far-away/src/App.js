import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
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

function Form() {
  // we need a piece of state 1#
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(eventBehave) {
    eventBehave.preventDefault(eventBehave);
    if (!desc) return;
    const newItem = { desc, quantity, packed: false, id: Date.now };
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
        value={desc}
        onChange={(eventBehave) => setDesc(eventBehave.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
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
