import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
// the props is not related to this object here , it's for copy paste purpose
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {

  return (
    <div className='container'>
      <Header />
      <Menu />
      <Footer />
    </div>
  )
};
// Pizza component is nested to the App component (which is the root component)
// it's bad idea to nest component (declare) inside component (it works but it's bad)
// you can directly render the component inside the root.render which is also works
function Header() {
  return (
    <header className='header'>
      <h1>Fast React Pizza Co.</h1>
    </header>
  )
}
//this menu is an parent component because i want to pass it's data to the pizza component (child)
// instead of this we can just bring the data , we map into the array and give the component the entire object then pass the new array into it
//so now we have new array with objects  (see line 96)
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className='menu'>
      <h2>Our Menu</h2>
      {/* ternary Conditional Rendering */}
      {numPizzas > 0 ? (
        <>
          <p>Welcome to Our Menu </p>
          <ul className='pizzas'>
            {pizzas.map((pizza) => (
              <Pizza pizzObj={pizza} key={pizza.name} />
            ))}
          </ul >
        </>
      ) : null}
      {/* <Pizza
        name="Pizza Spiniaci"
        ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mozarella, mushrooms, and onion"
        price={12}
        photoName="pizzas/funghi.jpg"
      /> */}
    </main>
  )
  //we can destructure props
  function Pizza({pizzObj}) {
    // if (props.pizzObj.soldOut) return null
    return (
      //the logic of condition
      <li className={`pizza ${pizzObj.soldOut ? "sold-out" : ""}`}>
        <img src={pizzObj.photoName} alt={pizzObj.name}></img>
        <div>
          <h3>{pizzObj.name}</h3>
          <p>{pizzObj.ingredients}</p>
          {/* Conditional render text and classes */}
          <span>{ pizzObj.soldOut ? "SOLD OUT" : pizzObj.price }</span>
        </div>
      </li>
    )
  }
}
//create component manually
function Footer() {
  // return React.createElement ('footer',null , "We're Currently Open!")
  // Conditional Rendering with && Short circuiting
  const hour = new Date().getHours();
  const openHour = 11;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  //Conditional Rendering using multiple returns
  // if(!isOpen)
  // return (
  // <p>We're happy to welcome you between {openHour }</p> 
  // ) 


  return (
    <footer className='footer'>
      {isOpen ? (
        <Order closeHour={closeHour} /> //embed the component and passing props to for variables to be known 

      ) : <p>We're happy to welcome you between {openHour} And {21} </p>}
    </footer >
  );

}
//extracting a pice of JSX to make it component by itself
function Order(props) {
  return (
    <div className='order'>
      <p>We're Open until {props.closeHour}:00. Come Visit us Or order online</p>
      <button className='btn'>order</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // strict mode will render the component twice to check for errors and etc (must search why)

  <React.StrictMode>
    <App />
  </React.StrictMode>
);

