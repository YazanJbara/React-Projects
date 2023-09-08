// All the Components are in the Components Folder , the data too  
import NavBar from "./NavBar";
import Main from "./Main";
export default function App() {
  return (
    <>
      {/* the nav bar component is splitted because it's not related to main  */}
      <NavBar />
      <Main />
    </>
  );
}
