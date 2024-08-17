import React, { useState, useRef, useEffect } from "react";

const TypingTest = () => {
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [misTyped, setMistyped] = useState(false);
  const textToType = "This is a sample paragraph for typing test.";
  const inputRef = useRef(null);

  // Focus the hidden input when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!startTime) {
      setStartTime(Date.now()); // Start timer when the user begins typing
    }
    console.log(value);
    if (value[value.length - 1] === textToType[value.length - 1]) {
        setMistyped(false);
      setInputValue(value);
    }
    else{
        setMistyped(true);
    }
  };

  return (
    <div
      className="select-none cursor-pointer"
      onClick={() => inputRef.current.focus()} // Focus input on click
    >
      <h2 className="text-xl font-bold mb-4">Typing Speed Test</h2>
      <p className="font-mono">
        {textToType.split("").map((letter, index) => (
          <span
          key={index}
          className={`${
            index === inputValue.length
              ? "border-l-2 border-black animate-blink" // Blinking border at the current typing position
              : ""
          } ${
            index < inputValue.length
              ? "text-green-500" // Font color green for correctly typed characters
              : "text-gray-400" // Font color light grey for remaining characters
          }
          ${
            misTyped==true
              ? "text-red-500"
              :
              ""
          }`
        }
        >
          {letter}
        </span>
        
        ))}
      </p>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="absolute left-[-9999px]" // Hide the input off-screen
      />
      {/* Add the blink animation styles inline */}
      <style>
        {`
          @keyframes blink {
            0% { border-color: black; }
            50% { border-color: transparent; }
            100% { border-color: black; }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default TypingTest;
