import { deleteLanguageApi } from '@/app/(components)/Configs/Utils/APIs/Admin_Apis';
import React, { FC, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';

interface IDeleteProps {
  openDeleteModalStatus: boolean;
  setOpenDeleteModalStatus(...args: unknown[]): unknown;
  getLanguage: any;
  languageID: any;
}

const DeleteWhatsappTemplate: FC<IDeleteProps> = ({ setOpenDeleteModalStatus, openDeleteModalStatus, languageID, getLanguage }) => {

  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    const response = await deleteLanguageApi(languageID)
    if (response.status === 200) {
      setOpenDeleteModalStatus(false)
      setLoading(false)
      getLanguage()
      toast.success(response.data.message)
    } else {
      setLoading(false)
      if (response.response?.status === 400 || response.response?.status === 422 || response.response?.status === 404) {
        toast.error(response.response?.data.message);
      } else {
        toast.error(response.response?.data.message);
      }
    }
  }

  return (
    <div>
      <Modal show={openDeleteModalStatus} onHide={setOpenDeleteModalStatus}>
        <Modal.Header closeButton>
          <h5>Confirmation Alert!</h5>
        </Modal.Header>
        <Modal.Body>
          <p className='lead'>Are you sure to remove this Whatsapp Template ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} variant="secondary" onClick={() => setOpenDeleteModalStatus(false)}>No <i className="fa-solid fa-xmark"></i></Button>
          <Button disabled={loading} variant="primary" onClick={handleDelete}>Yes <span className='ms-1'><i className="fa-solid fa-check"></i></span></Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteWhatsappTemplate