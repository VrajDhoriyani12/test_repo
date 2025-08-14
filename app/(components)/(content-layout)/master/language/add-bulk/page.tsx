'use client'

import { addLanguageInBilkApi } from '@/app/(components)/Configs/Utils/APIs/Admin_Apis'
import Pageheader from '@/shared/layouts-components/page-header/pageheader'
import Seo from '@/shared/layouts-components/seo/seo'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const page = () => {

  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({});
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("🚀 ~ onSubmit ~ data:", data)

    const formData = new FormData()
    formData.append('file', data.language_file[0])

    setSubmitLoading(true)

    const response = await addLanguageInBilkApi(formData)
    if (response.status === 201) {
      router.push('/master/language/')
      setSubmitLoading(false)
      reset()
    } else {
      setSubmitLoading(false)
      if (response.response?.status === 400 || response.response?.status === 422 || response.response?.status === 404) {
        toast.error(response.response?.data.message);
      } else {
        toast.error(response.response?.data.message);
      }
    }
  }

  return (
    <Fragment>
      <Seo title='Add-Language' />

      <Pageheader title="Language" currentpage="Add Language Xlsx File" />

      <div className="container-fluid">
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
              <Row>
                <Col xl={4}>
                  <Form.Group className='mb-2'>
                    <Form.Label>Language xlsx<span className='text-danger'>*</span></Form.Label>

                    <Form.Control
                      type='file'
                      accept='.xlsx'
                      {...register('language_file', {
                        required: 'Language xlsx is required',
                        validate: {
                          isXlsx: (files) =>
                            files[0]?.type ===
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                            'Only .xlsx files are allowed',
                        },
                      })}
                    />

                    <p className='text-danger'>{errors.language_file && <small className="text-danger">{(errors.language_file as any)?.message}</small>}</p>
                  </Form.Group>
                </Col>
              </Row>

              <div className='mt-4 d-flex gap-1 justify-content-end'>
                <Button className='btn-secondary d-flex align-items-center' onClick={() => history.back()}><i className="fa-solid fa-xmark me-1"></i> Cancel</Button>
                <Button className='withdrawal-active-btn' type='submit' disabled={submitLoading} ><i className="fa-solid fa-check me-2"></i> Submit {submitLoading && <Spinner animation="border" size="sm" />}</Button>
              </div>

            </Form>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  )
}

export default page