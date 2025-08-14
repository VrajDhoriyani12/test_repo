'use client'

import { addLanguageApi, validateNoWhiteSpace } from '@/app/(components)/Configs/Utils/APIs/Admin_Apis'
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
    setSubmitLoading(true)

    const body = {
      name: data.language_name
    }

    const response = await addLanguageApi(body)
    console.log("🚀 ~ onSubmit ~ response:", response)
    if (response.status === 201) {
      toast.success(response.data.message)
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

      <Pageheader title="Language" currentpage="Add Language" />

      <div className="container-fluid">
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
              <Row>
                <Col xl={4}>
                  <Form.Group className='mb-2'>
                    <Form.Label>Language<span className='text-danger'>*</span></Form.Label>
                    <InputGroup>
                      <Form.Control className='add-admin-input' type='text' {...register('language_name', { required: true, validate: validateNoWhiteSpace })} placeholder='Language' autoComplete='false' />
                    </InputGroup>
                    <p className='text-danger'>{errors.language_name && <p>Language is required</p>}</p>
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