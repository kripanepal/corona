import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Charts from "./Charts";

function Popup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <span onClick={handleShow}>{props.name}</span>

      <Modal
   
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"

      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
              {console.log(props.name)}
            <Charts name = {props.name}/>
         
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Popup;
