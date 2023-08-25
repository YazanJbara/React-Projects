States are the most important concept in react
props are used to pass data from outside the component , but what if we need the component handle his own data? also what if we need to make our app interactive? (changing UI results depending on actions) 
that's were state comes 
state is data that component can hold overtime , and we use it for information that it needs to remember throughout app's lifecycle
we can think of state as being the memory of a component
examples include notification count , text content of an input , active tap , it maybe can be complex like content of shopping card
what is common in state is the user can change the values
state is general term , piece of state/state variable is a single variable in component 
Updating component state triggers react to re-render the component , as a result of re-rendering react creates component view
state keeps UI in sync with data 
to implement state 
first we add new state variable then we use it in the code as jsx , then update the state in some event handler
we create state variable using useState (hook) function and it takes argument that we need to specify the default value of the state , useState will return an array , this array have an default variable and function we can use to update the variable , for this reason we need to destructure the array and specify the variable and the callback function : 

step1: declaring and destructuring
 const [step,setStep] = useState(1);

step2: using
 // i don't need the template literal anymore
      <div className={`${step >= 1 ? "active" : ""}`}>1</div>
      <div className={`${step >= 2 ? "active" : ""}`}>2</div>
      <div className={`${step >= 3 ? "active" : ""}`}>3</div>

step3: update the state in an eventhandler
  function handlePrevious() {
    if (step > 1) setStep(step - 1)
  };
  function handleNext() {
    if (step < 3) setStep(step + 1)
  };
best practice is not update the state based on the current state  , You should make a callback function and then receive it from functions

function handlePrevious() {
    if (step > 1) setStep(step - 1)
  };

best practice: 

function handlePrevious() {
    if (step > 1) setStep((current)=>current-1)
  };

the component has it's own component and won't affect another components or states

UI is a function of state , the state will change over time
!Important! : 
1-Use state variable for any data that the component should keep track of (remember) overtime
2-Whenever you want something in the component to be dynamic , create a piece of state related to that changes
3-If you want to change the way a components looks , or the data it displays , update its state
4-For data that should not trigger re-rendering components , don't use state , instead use regular variables