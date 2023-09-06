import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  //manually read value for steps , later I will make it dynamic
  //line 14 to 16 I conditionally render the class according to step value
  // I used useState , first I declared the variable and the function and gave it default value and destructure it
  const [step, setStep] = useState(1);
  const [isOpen, setIsopen] = useState(true);
  //step 3 : updating
  // condition to prevent unlimited counter
  function handlePrevious() {
    if (step > 1) setStep((current) => current - 1);
  }
  function handleNext() {
    if (step < 3) setStep((current) => current + 1);
  }
  //I want to conditionally render the entire component
  //So I put the entire elements in JS mode
  //it is better to make the state updating by callback here but I will leave it
  return (
    <>
      <button className="close" onClick={() => setIsopen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {/* step 2 is to use the state  */}
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            {/* usually creating function above the component then pass it in event handler is preferable way  */}
            <button
              style={{ backgroundColor: "#7950F2", color: "#FFF" }}
              onClick={handlePrevious}
            >
              Previous
            </button>

            <button
              style={{ backgroundColor: "#7950F2", color: "#FFF" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
