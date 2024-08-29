import React, { useState, useRef, useEffect, useCallback } from "react";
import Modal from "./Modal";
import axios from "axios";
import { textRoute } from "../utils/APIRoutes";

const TypingTest = (props) => {
    const [inputValue, setInputValue] = useState("");
    // const [startTime, setStartTime] = useState(null);
    const [misTyped, setMistyped] = useState(false); //to mark red the letter
    const [misSpelled, setMisSpelled] = useState(0); //count the number of misspelled
    const [startTime, setStartTime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeOut, setTimeout] = useState(false);
    const [loader, setLoader] = useState(true);
    const [accuracy, setAccuracy] = useState(0);
    const [misspelledLetters, setMisspelledLetters] = useState(new Array(26).fill(0));
    const [wpm, setWpm] = useState(0);
    const [textToType, setTextToType] = useState("This is a sample paragraph for typing test.");
    const inputRef = useRef(null);

    // Focus the hidden input when the component mounts
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // Handle input change

    useEffect(() => {
        if (timeOut) {
            console.log(inputValue)
            const typedWords = inputValue.split(' ');
            console.log(typedWords);
            const time = props.timeMode / 60000;
            console.log(time)
            setWpm(Math.ceil(typedWords.length / time));
            if (misSpelled == 0)
                setAccuracy(100)
            else
                setAccuracy(Math.ceil((inputValue.length / (inputValue.length + misSpelled) * 100)));
            console.log(misspelledLetters);
            setShowModal(true);
        }
    }, [timeOut]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${textRoute}?timeMode=${props.timeMode}&theme=story`);
                console.log(response.data.texts);
                setTextToType(response.data.texts)
                setLoader(false)
            } catch (err) {
                setTextToType("het how are you are you doing fine nice to meet you there this si si a asddfaj asdfj asfas f sfdjaskdfjkasjfa dfas dfas df sd fa faskdfaufoeirlasj asf asdf asdfkjalkclcnvlfjoui as");
                console.log(err);
            }
        };
        fetchData();

    }, [props.timeMode]);


    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                if (Date.now() - startTime >= (props.timeMode)) {
                    clearInterval(interval); // Clear the interval
                    setTimeout(true); // Show modal
                }
                setElapsedTime(elapsedTime => elapsedTime + 1);

            }, 1000);
        }
    }, [startTime])

    const onCloseModal = async (method) => {
        if (method == 0) {
            setInputValue("");
            inputRef.current.focus();
            setMistyped(false); //to mark red the letter
            setMisSpelled(0); //count the number of misspelled
            setStartTime(null);
            setShowModal(false);
            setElapsedTime(0);
            setTimeout(false);
            setAccuracy(0);
            setMisspelledLetters(new Array(26).fill(0));
            setWpm(0);
        }
        if (method == 1) {
            window.location.reload();
        }
    }

    const handleInputChange = async (e) => {
        const value = e.target.value;
        if (value[value.length - 1] === textToType[value.length - 1]) {
            setMistyped(false);
            setInputValue(value);
        }
        else {
            setMistyped(true);
            setMisSpelled(misSpelled + 1);
            let misspelledLetter = misspelledLetters;
            console.log(textToType.charCodeAt(value.length - 1) - 97)
            misspelledLetter[textToType.charCodeAt(value.length - 1) - 97] = misspelledLetter[textToType.charCodeAt(value.length - 1) - 97] + 1;
            setMisspelledLetters(misspelledLetter);
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
            {elapsedTime < props.timeMode / 1000 && <h2>{(props.timeMode / 1000) - elapsedTime}</h2>}
            <p className="font-mono">
                {!loader && textToType.split("").map((letter, index) => (
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
            {showModal && <Modal wpm={wpm} accuracy={accuracy} misspelledLetters={misspelledLetters} onCloseModal={onCloseModal}></Modal>}
        </div>
    );
};

export default TypingTest;
