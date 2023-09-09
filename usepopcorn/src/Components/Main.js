import { ListBox } from "./ListBox";
import { WatchedBox } from "./WatchedBox";
// both the left and right boxes separated into logical separation
export default function Main() {
  return (
    <main className="main">
      <ListBox />
      <WatchedBox />
    </main>
  );
}
