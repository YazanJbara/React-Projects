import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// Children prop is whatever in between opening and closing tag when I call the component
// Pass the onClick as a prop (the first step is in <Button><Button/>)
// now back to <Button><Button/> u need to make a new function that executes when the Click happens
// declare the function in separate line
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  // the false value because by default the AddFriend will not be shown until I click the Button (Add Friend Button)
  // then we need to use the state to conditionally render the state in the targeted Component
  // notice that only the HTML element have the event handlers attributes , the JSX Components can't
  // so I need to put the event handler in the Button Component ,
  //then u need to make it in the button Component then u need to pass the onClick to the button Component as a prop (Reusability)

  const [isAddFriendFormShown, SetisAddFriendFormShown] = useState(false);

  //declaring the updating function , the value is depending on the current state so it's the opposite of the default (setter function)
  // or You can use callback function  , true will work but I need callback to set the current value and the opposite of it
  function handleShowAddFriendForm() {
    //show is the current state and !show is the opposite
    SetisAddFriendFormShown((show) => !show);
  }
  // finally I want a close text instead of Add friend when the form is shown (conditional rendering)
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {/* the state variable is used , next I need To update the variable */}
        {isAddFriendFormShown && <FormAddFriend />}
        {/* define it  , pass the function*/}
        <Button onClick={handleShowAddFriendForm}>
          {isAddFriendFormShown ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    // I created a variable to assign the array into it to use it later
    // I made a loop on the array using friends variable then I give it an Immutable array to destructure it
    // I rendered the component Friends to pass the immutable array as a prop into it and destructure it in the Friends Component
    <ul>
      {friends.map((friend) => (
        <Friends friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

// Passing the prop to begin destructuring the list rendering as an li
function Friends({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {/* now conditional rendering to show who owe me and which one I owe  */}
      {friend.balance < 0 && (
        <p className="red">
          You Owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} Owes You {friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You And {friend.name} Are Even</p>}
      {/* because I will use the same button over and over I will but it in a
      component , the children in this case is Select and ofc I can change it */}
      <Button>Select</Button>
    </li>
  );
}

/* the UI needs to be re-render as a result of clicking the button 
thus I need useState function to make this possible
the main functionality of the button is whenever it's clicked the AddFriend form will shown , 
when it's shown I need another button that close it ,
I can put the useState Function here it will work , but the problem comes when this state is needed
in other siblings , so I will define it in the App component then pass the state as a prop (lifting Up) 
*/
// adding a friend and Image Functionality , this should be a lifted up state cz I want to share it with Friends Component,
// Firstly I need to use controlled elements which I can use the values of the form in my application (on piece of state for each input)
// thus the values will be synced with state

function FormAddFriend() {
  
  const [name, setName] = useState("");
  const [image, setImg] = useState("https://i.pravatar.cc/48?u=499476");


  function PreventDefaultReloadingandResetAndAddingFriend(event) {
    event.preventDefault();
    // If I click the button with nothing added it will still execute the code under , so i need if to prevent this
    if (!name || !image) return;
    // I need to create brand new list (object) for that new friend
    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    // works , I need now to make the input fields back to empty when I click the button
    setName("");
    setImg("https://i.pravatar.cc/48?u=499476");
  }

  return (
    // this is an essentially step to prevent the default reload of the form
    <form
      className="form-add-friend"
      onSubmit={PreventDefaultReloadingandResetAndAddingFriend}
    >
      <label>🧑‍🤝‍🧑 Friend Name</label>
      {/* here I simply made the input value controlled by the state (these values are the inputs where the user can add friends) */}
      {/* next we have to update the value by using onChange then give the event and setter and target the value */}
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label>🤷 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(event) => setImg(event.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split A Bill With X </h2>
      <label>💵 Bill Value</label>
      <input type="text" />

      <label>❌ Your Expense</label>
      <input type="text" />

      <label>🧑‍🤝‍🧑 X Expense</label>
      <input type="text" disabled />

      <label>🤑 Who is Paying the Bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
