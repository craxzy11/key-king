
import { Button, Modal, Select } from "flowbite-react";
import { useState } from "react";
import { VscBlank } from "react-icons/vsc";

const Model = (props) => {
    const [openModal, setOpenModal] = useState(true);
    const [modalPlacement, setModalPlacement] = useState('center')
    function findTopThreeIndices(arr) {
        const valueIndexPairs = arr.map((value, index) => ({ value, index }));
    
        valueIndexPairs.sort((a, b) => b.value - a.value);
    
        // Extract the indices of the top three values
        const topThreeIndices = valueIndexPairs.slice(0, 3).map(pair => pair.index);
    
        return topThreeIndices;
    }
    
    const asciiArray=findTopThreeIndices(props.misspelledLetters);
    // Convert the array of ASCII values to an array of characters
    const charArray = asciiArray.map(ascii => String.fromCharCode(ascii+97));
    let a=`${charArray[0]} , ${charArray[1]} , ${charArray[2]}`;

    const restartGame=()=>{
        setOpenModal(false);
        props.onCloseModal(0);
    }

    const nextGame=()=>{
        setOpenModal(false);
        props.onCloseModal(1);
    }
    


    return (
        <>
            <Modal
                show={openModal}
                position={modalPlacement}
                onClose={() => nextGame()}
                dismissible={true}

            >
                <Modal.Header theme={{ close: { base: null, icon: VscBlank } }}>Results</Modal.Header>
                <Modal.Body>
                    <div className="flex justify-between p-6">
                        <div className="flex flex-col items-center">
                            <p className="text-base font-semibold text-blue-500">Words Per Minute:</p>
                            <p className="text-lg text-green-500">{props.wpm}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-base font-semibold text-red-500">Accuracy:</p>
                            <p className="text-lg text-green-500">{`${props.accuracy}%`}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-base font-semibold text-purple-500">Most Mistyped Characters:</p>
                            <p className="text-lg text-green-500">{a}</p>
                        </div>
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <div className="flex justify-center w-full space-x-4">
                        <Button onClick={() => nextGame()}>Try Again</Button>
                        <Button color="gray" onClick={() => restartGame()}>
                            Restart
                        </Button>
                    </div>
                </Modal.Footer>

            </Modal>
        </>
    );
}
export default Model;