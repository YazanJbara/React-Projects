//for calculating this stats , we need derived state not separate state
// because the number of items can be calculated from the items array itself
export default function Stats({ items }) {
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
          : `💕You Have ${numItems} items on your list and you already packed 
          ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
