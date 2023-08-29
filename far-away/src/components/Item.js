export default function Item({ item, onDelete, onCheck }) {
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
