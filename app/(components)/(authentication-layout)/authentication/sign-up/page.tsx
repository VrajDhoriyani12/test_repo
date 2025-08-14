"use client"
import { SignUpApi, validateNoWhiteSpace } from "@/app/(components)/Configs/Utils/APIs/Admin_Apis";
import SpkButton from "@/shared/@spk-reusable-components/reusable-uielements/spk-button";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Basic = () => {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordShow2, setPasswordShow2] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.querySelector("body")?.classList.add("authentication-background");
        return () => {
            document.querySelector("body")?.classList.remove("authentication-background");
        }
    }, [])

    const onSubmit = async (data: any) => {
        console.log("🚀 ~ data:", data)
        setLoading(true)

        const body = {
            name: data.full_name,
            email: data.email,
            mobile_number: data.phone_number,
            password: data.password,
            confirm_password: data.co_password,
        }

        const response = await SignUpApi(body)
        console.log("🚀 ~ onSubmit ~ response:", response)
        if (response.status === 201) {
            toast.success(response.data.message);
            router.push('/')
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
            <Seo title="signup-Basic" />
            <div className="container-lg">
                <Row className="justify-content-center align-items-center authentication authentication-basic h-100">
                    <Col xxl={5} xl={5} lg={5} md={6} sm={8} className="col-12">
                        <Card className="custom-card my-4">
                            <Card.Body className="p-5">
                                <div className="mb-4 d-flex justify-content-center">
                                    <Link scroll={false} href="/dashboard/sales">
                                        <img src="../../../assets/images/brand-logos/desktop-logo.png" alt="logo" className="desktop-logo" />
                                        <img src="../../../assets/images/brand-logos/desktop-white.png" alt="logo" className="desktop-white" />
                                    </Link>
                                </div>
                                <p className="h5 mb-2 text-center">Sign Up</p>
                                <p className="mb-4 text-muted op-7 fw-normal text-center">Welcome! Begin by creating your account.</p>
                                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row gy-3">
                                        <Col xl={12}>
                                            <Form.Label>Full Name<span className="fs-12 text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Your Full Name"
                                                {...register('full_name', {
                                                    required: 'Full Name is required',
                                                    validate: validateNoWhiteSpace,
                                                })}
                                            />
                                            {errors.full_name && <small className="text-danger">{(errors.full_name as any)?.message}</small>}
                                        </Col>
                                        <Col xl={12}>
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
                                        </Col>
                                        <Col xl={12}>
                                            <Form.Label>Phone Number<span className="fs-12 text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Your Phone Number"
                                                {...register('phone_number', {
                                                    required: 'Phone Number is required',
                                                    validate: validateNoWhiteSpace,
                                                })}
                                                onInput={(e: any) => {
                                                    if (e.target.value.length > 10) {
                                                        if (e.target.value.length > 10) {
                                                            e.target.value = e.target.value.slice(0, 10)
                                                        }
                                                    }
                                                }}
                                            />
                                            {errors.phone_number && <small className="text-danger">{(errors.phone_number as any)?.message}</small>}
                                        </Col>
                                        <Col xl={12}>
                                            <Form.Label>Password<span className="fs-12 text-danger">*</span></Form.Label>

                                            <div className='position-relative'>
                                                <Form.Control type={(passwordShow) ? 'text' : "password"} className="form-control" id="create-confirmpassword" placeholder="confirm password" {...register("password", {
                                                    required: "Password is required",
                                                    validate: validateNoWhiteSpace,
                                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                                })} />
                                                <Link scroll={false} href="#!" onClick={() => setPasswordShow(!passwordShow)} className="show-password-button text-muted"
                                                ><i className={`${passwordShow ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i></Link>
                                            </div>
                                            {errors.password && <small className='text-danger'>{(errors.password as any)?.message}</small>}
                                        </Col>
                                        <Col xl={12}>
                                            <Form.Label>Confirm Password<span className="fs-12 text-danger">*</span></Form.Label>

                                            <div className='position-relative'>
                                                <Form.Control type={(passwordShow2) ? 'text' : "password"} className="form-control" id="create-confirmpassword" placeholder="confirm password" {...register("co_password", {
                                                    required: "Confirm Password is required",
                                                    validate: validateNoWhiteSpace,
                                                    minLength: { value: 6, message: "Confirm Password must be at least 6 characters" }
                                                })} />
                                                <Link scroll={false} href="#!" onClick={() => setPasswordShow2(!passwordShow2)} className="show-password-button text-muted"
                                                ><i className={`${passwordShow2 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i></Link>
                                            </div>
                                            {errors.co_password && <small className='text-danger'>{(errors.co_password as any)?.message}</small>}
                                        </Col>
                                    </div>
                                    <div className="d-grid mt-4">
                                        <Button className="btn btn-primary" type='submit'>Create Account</Button>
                                    </div>
                                </Form>
                                <div className="text-center">
                                    <p className="text-muted mt-3 mb-0">Already have an account? <Link scroll={false} href="/" className="text-primary">Sign In</Link></p>
                                </div>
                                <div className="btn-list text-center mt-3">
                                    <SpkButton Buttontype="button" Buttonvariant="primary-light" Customclass="btn-icon">
                                        <i className="ri-facebook-line lh-1 align-center fs-17"></i>
                                    </SpkButton>
                                    <SpkButton Buttontype="button" Buttonvariant="primary1-light" Customclass="btn-icon">
                                        <i className="ri-twitter-x-line lh-1 align-center fs-17"></i>
                                    </SpkButton>
                                    <SpkButton Buttontype="button" Buttonvariant="primary2-light" Customclass="btn-icon">
                                        <i className="ri-instagram-line lh-1 align-center fs-17"></i>
                                    </SpkButton>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
};

export default Basic;