import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
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
  function handleClear() {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: <strong>Done!</strong>,
      html: <i>All Items Now Gone!</i>,
      icon: "success",
    });

    if (MySwal) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAdditems} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onCheck={handleCheck}
        onClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}
