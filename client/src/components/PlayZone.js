import React, { useState, useRef, useEffect, useCallback } from "react";
import Modal from "./Modal";

const TypingTest = (props) => {
    const [inputValue, setInputValue] = useState("");
    // const [startTime, setStartTime] = useState(null);
    const [misTyped, setMistyped] = useState(false);
    const [misSpelled, setMisSpelled] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeOut, setTimeout] = useState(false);
    const [wpm, setWpm] = useState(0);
    const textToType = "This is a sample paragraph for typing test.";
    const inputRef = useRef(null);

    // Focus the hidden input when the component mounts
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // Handle input change
    
    useEffect(() => {
        console.log(inputValue)
        const typedWords = inputValue.split(' ');
        console.log(typedWords);
        const time = props.timeMode / 60000;
        console.log(time)
        setWpm(Math.ceil(typedWords.length / time));
        console.log(wpm);
        if(timeOut)
        setShowModal(true);
    },[timeOut]);
    

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                if (Date.now()-startTime >= (props.timeMode )) {
                    clearInterval(interval); // Clear the interval
                    setTimeout(true); // Show modal
                }
                setElapsedTime(elapsedTime=>elapsedTime+1);
                
            }, 1000);
        }
    }, [startTime])

    const handleInputChange = async (e) => {
        const value = e.target.value;
        if (value[value.length - 1] === textToType[value.length - 1]) {
            setMistyped(false);
            setInputValue(value);
        }
        else {
            setMistyped(true);
            setMisSpelled(misSpelled + 1);
        }

        if (!startTime) {
            setStartTime(Date.now());
        }
    };



    return (
        <div
            className="select-none cursor-pointer"
            onClick={() => inputRef.current.focus()} // Focus input on click
        >
            <h2 className="text-xl font-bold mb-4">Typing Speed Test</h2>
            {elapsedTime < props.timeMode/1000 && <h2>{(props.timeMode/1000)-elapsedTime}</h2>}
            <p className="font-mono">
                {textToType.split("").map((letter, index) => (
                    <span
                        key={index}
                        className={`${index === inputValue.length
                            ? "border-l-2 border-black animate-blink" // Blinking border at the current typing position
                            : ""
                            } ${index < inputValue.length
                                ? "text-green-500" // Font color green for correctly typed characters
                                : "text-gray-400" // Font color light grey for remaining characters
                            }
          ${misTyped == true && index == inputValue.length
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
            {showModal && <Modal wpm={wpm}></Modal>}
        </div>
    );
};

export default TypingTest;
