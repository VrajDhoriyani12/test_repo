"use client"
import { forgotPasswordApi, validateNoWhiteSpace } from "@/app/(components)/Configs/Utils/APIs/Admin_Apis";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const page = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)

  const onsubmit = async (data: any) => {
    console.log("data", data)
    setLoading(true)

    const body = {
      email: data.email
    }

    const response = await forgotPasswordApi(body)
    if (response.status === 200) {
      toast.success(response.data.message);
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
    <Fragment>
      <Seo title="Forgot-password" />
      <div className="authentication-background">
        <div className="container-lg">
          <Row className="justify-content-center align-items-center authentication authentication-basic h-100">
            <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
              <Card className="custom-card my-4">
                <Card.Body className="p-5">
                  <div className="mb-3 d-flex justify-content-center">
                    <Link href="/dashboard/sales">
                      <img src="../../../assets/images/brand-logos/desktop-logo.png" alt="logo" className="desktop-logo" />
                      <img src="../../../assets/images/brand-logos/desktop-white.png" alt="logo" className="desktop-white" />
                    </Link>
                  </div>
                  <p className="h5 mb-2 text-center">Forgot Password</p>
                  {/* <p className="mb-4 text-muted op-7 fw-normal text-center fs-14">Hi Henry!</p> */}
                  <Form onSubmit={handleSubmit(onsubmit)}>
                    <div className="row gy-3">
                      <Col xl={12}>
                        <Form.Group as={Col} md="12" className="mb-3">
                          <Form.Label>Email<span className="fs-12 text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Your Email"
                            {...register('email', {
                              required: 'Email is required',
                              validate: validateNoWhiteSpace,
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Enter a valid email address'
                              }
                            })}
                          />
                          {errors.email && <small className="text-danger">{(errors.email as any)?.message}</small>}
                        </Form.Group>
                      </Col>
                    </div>
                    <div className="d-grid mt-4">
                      <Button type='submit' className="btn btn-primary">Submit</Button>
                    </div>
                  </Form>
                  <div className="text-center">
                    <p className="text-muted mt-3">Remembered your password? <Link href="/" className="text-primary">Sign In</Link></p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  )
}

export default page