import React, { FC } from 'react'
import { Button, Modal } from "react-bootstrap";
import { Props } from './props';

export const CardModal: FC<Props> = (props: Props) => {
  return (
    <Modal show={props.show} onHide={props._handleSaveChanges}>
      <Modal.Header>
        <Modal.Title>
          <input className="form-control"
            value={props.modalCardInfo.title}
            onChange={props._handleTitleChange}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between">
          <h6>Description</h6>
        </div>
        <textarea className="form-control"
          style={{ fontSize: 16 }}
          value={props.modalCardInfo.description}
          onChange={props._handleDescriptionChange}
        />
        <div className="mt-3 d-flex justify-content-between">
          <p style={{ fontSize: 14 }}>Last Edit: {props.modalCardInfo.editDate.toLocaleDateString()}</p>
          <p style={{ fontSize: 14 }}>Created at: {props.modalCardInfo.creationDate.toLocaleDateString()}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="danger" onClick={props._handleDelete}>
          Delete
            </Button>
        <Button variant="success" onClick={props._handleSaveChanges}>
          Save Changes
            </Button>
      </Modal.Footer>
    </Modal>
  )
}