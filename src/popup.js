import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Charts from "./Charts";
import './pop.css'

function Popup(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span style = {{cursor: "pointer"}}onClick={handleShow}>{props.name}</span>

      <Modal
   
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           <span className = "popUpHeader">  {props.name} </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Charts name = {props.name} from = {props.from} className = "popCharts"/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Popup;
