
import { Button, Modal, Select } from "flowbite-react";
import { useState } from "react";
import { VscBlank } from "react-icons/vsc";

const Model = (props) => {
    const [openModal, setOpenModal] = useState(true);
    const [modalPlacement, setModalPlacement] = useState('center')

    return (
        <>
            <Modal
                show={openModal}
                position={modalPlacement}
                onClose={() => {setOpenModal(false)}}
                dismissible={false}

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
                            <p className="text-lg text-green-500">[Accuracy Value]</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-base font-semibold text-purple-500">Mistyped Characters:</p>
                            <p className="text-lg text-green-500">[Mistyped Characters Value]</p>
                        </div>
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <div className="flex justify-center w-full space-x-4">
                        <Button onClick={() => setOpenModal(false)}>Try Again</Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Restart
                        </Button>
                    </div>
                </Modal.Footer>

            </Modal>
        </>
    );
}
export default Model;