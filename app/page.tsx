"use client"
import { useRouter } from 'next/navigation';
import SpkButton from '@/shared/@spk-reusable-components/reusable-uielements/spk-button';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { SignInApi, validateNoWhiteSpace } from '../app/(components)/Configs/Utils/APIs/Admin_Apis'
import { toast } from 'react-toastify';

const page = () => {

    // console.log("env", process.env.NEXT_PUBLIC_SERVER_URL)

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordShow, setPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.querySelector("body")?.classList.add("authentication-background");

        return () => {
            document.querySelector("body")?.classList.remove("authentication-background");
        }
    });

    const onSubmit = async (data: any) => {
        console.log("data", data)

        setLoading(true)

        const body = {
            email: data.email,
            password: data.password,
        }

        const response = await SignInApi(body)
        console.log("🚀 ~ onSubmit ~ response:", response)

        if (response.status === 200) {
            toast.success(response.data.message);
            router.push('/broadcasting/whatsapp-broadcast')
            localStorage.setItem("botSailorToken", response.data.loginToken)
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
            <html>
                <body className="">
                    <div className="container">
                        <div className="row justify-content-center align-items-center authentication authentication-basic h-100 pt-3">
                            <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
                                <Card className="custom-card">
                                    <Card.Body className="p-5">
                                        <div className="mb-3 d-flex justify-content-center">
                                            <Link scroll={false} href="/broadcasting/whatsapp-broadcast">
                                                <img src="../../../assets/images/brand-logos/desktop-logo.png" alt="logo" className="desktop-logo" />
                                                <img src="../../../assets/images/brand-logos/desktop-white.png" alt="logo" className="desktop-white" />
                                            </Link>
                                        </div>
                                        <p className="h5 mb-2 text-center">Sign In</p>
                                        {/* <p className="mb-4 text-muted op-7 fw-normal text-center">Welcome back Henry !</p> */}
                                        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                                            <Row className="mb-3">
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

                                                <Form.Group as={Col} md="12" className="mb-3">
                                                    <Form.Label>Password<span className="fs-12 text-danger">*</span></Form.Label>

                                                    <Link href="/authentication/forgot-password" className="float-end fw-normal text-muted">Forget password ?</Link>

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
                                                </Form.Group>
                                            </Row>
                                            <Button type="submit" className='w-100'>Sign In</Button>
                                        </Form>

                                        <div className="text-center">
                                            <p className="text-muted mt-3 mb-0">Dont have an account? <Link scroll={false} href="/authentication/sign-up" className="text-primary">Sign Up</Link></p>
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
                        </div>
                    </div>
                </body>
            </html>
        </Fragment>
    )
}

export default page