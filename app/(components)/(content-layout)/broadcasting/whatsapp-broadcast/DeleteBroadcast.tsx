'use client'

import React, { FC, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface IDeleteProps {
  isOpen: boolean;
  setIsOpen(...args: unknown[]): unknown;
}

const DeleteBroadcast: FC<IDeleteProps> = ({ setIsOpen, isOpen }) => {

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  return (
    <div>
      <Modal show={isOpen} onHide={setIsOpen}>
        <Modal.Header closeButton>
          <Modal.Title as="h6">Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteBroadcast
