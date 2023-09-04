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

  /* Displaying new friend state */
  /* the friends variable in the map now is undefined , so now we need to pass the state variable as a prop to the
   FriendsList Component */
  const [friends, setFriends] = useState(initialFriends);

  // BCZ the form and the list are siblings we need lifted up state to make selecting friend work
  // I don't need the FormSplitBill component to be not shown when no friend is selected , so I need to pass the state variable to that component
  const [selectedFriend, setSelectedFriend] = useState(null); //null because by default no object (no one selected) , null is not working , "" works

  //declaring the updating function , the value is depending on the current state so it's the opposite of the default (setter function)
  // or You can use callback function  , true will work but I need callback to set the current value and the opposite of it
  function handleShowAddFriendForm() {
    //show is the current state and !show is the opposite
    SetisAddFriendFormShown((show) => !show);
  }
  // finally I want a close text instead of Add friend when the form is shown (conditional rendering)
  // adding a friend handle function to update the UI , I will pass the friend object that we created in the map (argument)
  // here the current is actually the current friends list , the friend is the new friend
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    SetisAddFriendFormShown(false); // to make the another form close when i hit select (if it's opened)
  }

  //function to update the setter function of the selection , the friend object is assigned to when select happen
  // now pass it down to FriendList and Friends  Components
  function handleSelection(friend) {
    //this code is for updating the setter function and for when i click close it will close the form , the ? after selected is optional chaining to solve null issue of can't read the properties
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    SetisAddFriendFormShown(false);
  }
  
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelection} //pass this to FriendList
          selectedFriend={selectedFriend}
        />
        {/* the state variable is used , next I need To update the variable , Here also I will pass the update function , the onAddFriend is like onClick but customized for me , and this one what I will pass down */}
        {isAddFriendFormShown && (
          <FormAddFriend onAddFriend={handleAddFriend} />
        )}
        {/* define it  , pass the function*/}
        <Button onClick={handleShowAddFriendForm}>
          {isAddFriendFormShown ? "Close" : "Add Friend"}
        </Button>
      </div>
      {/* the selected friend should now receive the current friend and display it's name in the FormSplitBill component */}
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
// destructure the state variable to make the map work
// now I need to give the form ability to add friends , u have to ways , you can pass the setter function to the form
// or you can make an event handler function in the parent
function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  // (lifted) const friends = initialFriends;
  return (
    // I created a variable to assign the array into it to use it later
    // I made a loop on the array using friends variable then I give it an Immutable array to destructure it
    // I rendered the component Friends to pass the immutable array as a prop into it and destructure it in the Friends Component
    <ul>
      {friends.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

// Passing the prop to begin destructuring the list rendering as an li
// here where we need to compare the selected for each one in the list
function Friends({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id; // this variable will be used to conditionally render a css class
  return (
    <li className={isSelected ? "selected" : ""}>
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
      {/* the button when clicked it will take the current friend then will save it to the state */}
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImg] = useState("https://i.pravatar.cc/48?u=499476");

  function PreventDefaultReloadingandResetAndAddingFriend(event) {
    event.preventDefault();
    // If I click the button with nothing added it will still execute the code under , so i need if to prevent this
    if (!name || !image) return;

    const id = crypto.randomUUID();

    // I need to create brand new list (object) for that new friend
    /* now I need the object (newFriend object) to be displayed in the page when I click to add friend
    thus , I need state , the FriendList Component who needs to display the new friend , but I can't pass
    props because they are siblings components , now we need this functionality as a lifted up state.
    firstly , you need to git rid of  const friends = initialFriends; , this variable will be a lifted up state.
    the Update happens here in this Component but the display in FriendList Component

    */
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    // works , I need now to make the input fields back to empty when I click the button
    // Adding a new friend
    onAddFriend(newFriend);
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
// receiving the selected friend , the .name part because we pass the friend object in the selection function
// the part of mark the selected friend and changing text to close.
// how do the application well know that it is currently selected?
// first pass the selected friend to the friend object then compare that with each friend (each component that received the onselect needs the selected)
// here I need to create controlled elements to let react handle the input values

function FormSplitBill({ selectedFriend, onSplitBill }) {
  function handleSubmitSplitBill(e) {
    e.preventDefault();
    if (!bill || !expenseByUser) return;
    onSplitBill(whoisPaying === "user" ? paidByFriend : -expenseByUser);
  }
  const [bill, setBill] = useState("");
  const [expenseByUser, setExpenseByUser] = useState("");
  const paidByFriend = bill ? bill - expenseByUser : ""; //derived state
  const [whoisPaying, setWhoisPaying] = useState("user");
  return (
    <form className="form-split-bill" onSubmit={handleSubmitSplitBill}>
      <h2>Split A Bill With {selectedFriend.name} </h2>
      <label>💵 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>❌ Your Expense</label>
      <input
        type="text"
        value={expenseByUser}
        onChange={(e) =>
          setExpenseByUser(
            Number(e.target.value) > bill
              ? expenseByUser
              : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name} Expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is Paying the Bill?</label>
      <select
        value={whoisPaying}
        onChange={(e) => setWhoisPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
