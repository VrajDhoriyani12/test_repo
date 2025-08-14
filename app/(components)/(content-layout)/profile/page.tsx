"use client"
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, InputGroup, Nav, Row, Tab } from "react-bootstrap";
import { getProfileApi, updatePasswordApi, updateProfileApi, validateNoWhiteSpace } from "../../Configs/Utils/APIs/Admin_Apis";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ImageUploader from "../../ImageUploader";

const Profile = () => {

    const [loading, setLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitPasswordLoading, setSubmitPasswordLoading] = useState(false)
    const [profileData, setProfileData] = useState<any>()
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm()

    const [imageFileList, setImageFileList] = useState<any[]>([]);
    const [imageFiles, setImageFiles] = useState<any>([]);

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [ConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const getProfile = async () => {
        setLoading(true)

        const response = await getProfileApi()
        if (response.status === 200) {
            setLoading(false)
            setProfileData(response.data.findAdmin)
            setValue('full_name', response.data.findAdmin.name)
            setValue('email', response.data.findAdmin.email)
            setValue('phone_number', response.data.findAdmin.mobile_number)

            const image = process.env.NEXT_PUBLIC_SERVER_URL + "/" + response.data.findAdmin.image;
            if (response.data.findAdmin.image) {
                setImageFileList([
                    {
                        newUrl: response.data.findAdmin.image,
                        url: image,
                        originFileObj: image,
                        webkitRelativePath: "",
                        type: ''
                    }
                ])
            }
        } else {
            setLoading(false)
            if (response.response?.status === 400 || response.response?.status === 422 || response.response?.status === 404) {
                toast.error(response.response?.data.message);
            } else {
                toast.error(response.response?.data.message);
            }
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    const onSubmit = async (data: any) => {
        setSubmitLoading(true)

        const formData = new FormData()
        formData.append('name', data.full_name)
        formData.append('email', data.email)
        formData.append('mobile_number', data.phone_number)

        if (imageFiles.length > 0) { formData.append('image', imageFiles[0]) }

        if (imageFileList.length === 0) { formData.append('delete_image', 'true') }

        const response = await updateProfileApi(formData)
        if (response.status === 200) {
            toast.success(response.data.message)
            getProfile()
        } else {
            setLoading(false)
            if (response.response?.status === 400 || response.response?.status === 422 || response.response?.status === 404) {
                toast.error(response.response?.data.message);
            } else {
                toast.error(response.response?.data.message);
            }
        }
    }

    const handlePasswordSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitPasswordLoading(true)

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;

        if (oldPassword === '') {
            toast.error('Please Enter Old Password')
        } else if (newPassword === '') {
            toast.error('Please Enter New Password')
        } else if (confirmPassword === '') {
            toast.error('Please Enter Confirm Password')
        } else if (!regex.test(newPassword)) {
            toast.error('Password Must Contain At Least One Uppercase Letter, One Lowercase Letter, One Number, and One Special Character')
            setSubmitPasswordLoading(false)
        } else {
            const body = {
                password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            }

            const response = await updatePasswordApi(body)
            if (response.status === 200) {
                toast.success(response.data.message)
                setOldPassword('')
                setNewPassword('')
                setConfirmPassword('')
                getProfile()
                setSubmitPasswordLoading(false)
            } else {
                setSubmitPasswordLoading(false)
                if (response.response?.status === 400 || response.response?.status === 422 || response.response?.status === 404) {
                    toast.error(response.response?.data.message);
                } else {
                    toast.error(response.response?.data.message);
                }
            }
        }
    }

    return (
        <Fragment>
            {/* <!-- Page Header --> */}
            <Seo title="Pages-Profile" />

            <Pageheader title="Pages" currentpage="Profile" activepage="Profile" />

            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <Row>
                <Col xl={12}>
                    <Card className="custom-card profile-card">
                        <div className="profile-banner-img">
                            <img src="../../assets/images/media/media-3.jpg" className="card-img-top" alt="..." />
                        </div>
                        <Card.Body className="pb-0 position-relative">
                            <div className="row profile-content">
                                <Col xl={3}>
                                    <Card className="custom-card overflow-hidden border">
                                        <Card.Body className=" border-bottom border-block-end-dashed">
                                            <div className="text-center">
                                                <span className="avatar avatar-xxl avatar-rounded online mb-3">
                                                    {/* <img src="../../assets/images/faces/11.jpg" alt="" /> */}
                                                    {/* <img src={profileData?.image && profileData?.image !== null ? `${process.env.NEXT_PUBLIC_SERVER_URL} / + ${profileData?.image}` : '../../assets/images/faces/11.jpg'} alt="" /> */}
                                                    <img src={profileData?.image && profileData?.image !== null ? process.env.NEXT_PUBLIC_SERVER_URL + "/" + profileData?.image : `../../assets/images/faces/11.jpg`} />
                                                </span>
                                                <h5 className="fw-semibold mb-1">{profileData?.name}</h5>
                                            </div>
                                        </Card.Body>
                                        <div className="p-3 pb-1 d-flex flex-wrap justify-content-between">
                                            <div className="fw-medium fs-15 text-primary1">
                                                Basic Info :
                                            </div>
                                        </div>
                                        <Card.Body className=" border-bottom border-block-end-dashed p-0">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item pt-2 border-0">
                                                    <div><span className="fw-medium me-2">Name :</span><span className="text-muted">{profileData?.name}</span></div>
                                                </li>
                                                <li className="list-group-item pt-2 border-0">
                                                    <div><span className="fw-medium me-2">Email :</span><span className="text-muted">{profileData?.email}</span></div>
                                                </li>
                                                <li className="list-group-item pt-2 border-0">
                                                    <div><span className="fw-medium me-2">Phone :</span><span className="text-muted">{profileData?.mobile_number}</span></div>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xl={9}>
                                    <Card className="custom-card overflow-hidden border">
                                        <Card.Body className="">
                                            <Tab.Container defaultActiveKey="about">
                                                <Nav className="nav-tabs tab-style-6 mb-3 p-0" id="myTab" role="tablist">
                                                    <Nav.Item className="" role="presentation">
                                                        <Nav.Link eventKey="about" className="w-100 text-start" id="profile-about-tab" data-bs-toggle="tab"
                                                            data-bs-target="#profile-about-tab-pane" type="button" role="tab"
                                                            aria-controls="profile-about-tab-pane" aria-selected="true">About</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className="" role="presentation">
                                                        <Nav.Link eventKey="edit" className="w-100 text-start" id="edit-profile-tab" data-bs-toggle="tab"
                                                            data-bs-target="#edit-profile-tab-pane" type="button" role="tab"
                                                            aria-controls="edit-profile-tab-pane" aria-selected="true">Edit Profile</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className="" role="presentation">
                                                        <Nav.Link eventKey="edit-password" className="w-100 text-start" id="edit-password-tab" data-bs-toggle="tab"
                                                            data-bs-target="#edit-password-tab-pane" type="button" role="tab"
                                                            aria-controls="edit-password-tab-pane" aria-selected="true">Edit Password</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                                <Tab.Content id="profile-tabs">
                                                    <Tab.Pane eventKey="about" className="p-0 border-0" id="profile-about-tab-pane" role="tabpanel" aria-labelledby="profile-about-tab" tabIndex={0}>
                                                        <ul className="list-group list-group-flush border rounded-3">
                                                            <li className="list-group-item p-3">
                                                                <span className="fw-medium fs-15 d-block mb-3">Contact Info :</span>
                                                                <div className="text-muted">
                                                                    <p className="mb-3">
                                                                        <span className="avatar avatar-sm avatar-rounded text-primary p-1 bg-primary-transparent me-2">
                                                                            <i className="ri-mail-line align-middle fs-15"></i>
                                                                        </span>
                                                                        <span className="fw-medium text-default">Email : </span> {profileData?.email}
                                                                    </p>
                                                                    <p className="mb-0">
                                                                        <span className="avatar avatar-sm avatar-rounded text-primary3 p-1 bg-primary3-transparent me-2">
                                                                            <i className="ri-phone-line align-middle fs-15"></i>
                                                                        </span>
                                                                        <span className="fw-medium text-default">Phone : </span> {profileData?.mobile_number}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="edit" className="p-0 border-0" id="edit-profile-tab-pane" role="tabpanel"
                                                        aria-labelledby="edit-profile-tab" tabIndex={1}>
                                                        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                                                            <ul className="list-group list-group-flush border rounded-3">
                                                                <li className="list-group-item p-3">
                                                                    <span className="fw-medium fs-15 d-block mb-3">Personal Info :</span>
                                                                    <div className="row gy-3 align-items-center">
                                                                        <Col xl={3}>
                                                                            <div className="lh-1">
                                                                                <span className="fw-medium">Image :</span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xl={9}>
                                                                            <ImageUploader
                                                                                fileList={imageFileList}
                                                                                setFileList={setImageFileList}
                                                                                setFiles={setImageFiles}
                                                                                title="Upload Photo"
                                                                                imageLength='1'
                                                                                isMultiple={false}
                                                                                maxFileSizeMB={2}
                                                                                allowedFileTypes={['image/jpeg', 'image/png', 'image/jpg']}
                                                                                ErrorMsg='Only files of jpeg, jpg, png are allowed'
                                                                            />
                                                                            <small>Supported files: <b>jpeg, jpg, png.</b><b>(2 MB)</b></small>
                                                                        </Col>
                                                                        <Col xl={3}>
                                                                            <div className="lh-1">
                                                                                <span className="fw-medium">Name :</span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xl={9}>
                                                                            {/* <input type="text" className="form-control" placeholder="Placeholder" defaultValue="Spencer Robin" /> */}
                                                                            <Form.Control type="text" placeholder="Name"
                                                                                {...register('full_name', {
                                                                                    required: 'Full Name is required',
                                                                                    validate: validateNoWhiteSpace,
                                                                                })} />
                                                                            {errors.full_name && <small className="text-danger">{(errors.full_name as any)?.message}</small>}
                                                                        </Col>
                                                                    </div>
                                                                </li>
                                                                <li className="list-group-item p-3">
                                                                    <span className="fw-medium fs-15 d-block mb-3">Contact Info :</span>
                                                                    <div className="row gy-3 align-items-center">
                                                                        <Col xl={3}>
                                                                            <div className="lh-1">
                                                                                <span className="fw-medium">Email :</span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xl={9}>
                                                                            {/* <input type="email" className="form-control" placeholder="Placeholder" defaultValue="spencer.robin22@example.com" /> */}
                                                                            <Form.Control type="email" placeholder="Email" {...register('email', {
                                                                                required: 'Email is required',
                                                                                validate: validateNoWhiteSpace,
                                                                                pattern: {
                                                                                    value: /^\S+@\S+$/i,
                                                                                    message: 'Enter a valid email address'
                                                                                }
                                                                            })} />
                                                                            {errors.email && <small className="text-danger">{(errors.email as any)?.message}</small>}
                                                                        </Col>
                                                                        <Col xl={3}>
                                                                            <div className="lh-1">
                                                                                <span className="fw-medium">Phone :</span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xl={9}>
                                                                            {/* <input type="text" className="form-control" placeholder="Placeholder" defaultValue="+1 (222) 111 - 57840" /> */}
                                                                            <Form.Control type="number" placeholder="Phone Number" {...register('phone_number', {
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
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="d-flex justify-content-end mt-2">
                                                                <Button className="text-end" type="submit">Submit</Button>
                                                            </div>
                                                        </Form>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="edit-password" className="p-0 border-0" id="edit-password-tab-pane" role="tabpanel" aria-labelledby="edit-password-tab-pane" tabIndex={2}>
                                                        <Form noValidate onSubmit={handlePasswordSubmit}>
                                                            <ul className="list-group list-group-flush border rounded-3">
                                                                <li className="list-group-item p-3">
                                                                    <span className="fw-medium fs-15 d-block mb-3">Password Info :</span>
                                                                    <div className="row gy-3 align-items-center">
                                                                        <Col xl={3}>
                                                                            <div className="lh-1">
                                                                                <span className="fw-medium">Old Password :</span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xl={9}>
                                                                            <InputGroup>
                                                                                <Form.Control type={passwordVisible ? 'text' : 'password'} onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} className="form-control" required placeholder='Password' />
                                                                                <InputGroup.Text className='bg-transparent shadow-none PasswordVisible ' onClick={() => { setPasswordVisible(!passwordVisible) }} style={{ width: '46px' }}>
                                                                                    <i className={passwordVisible ? "fa fa-eye" : "fa fa-eye-slash"} />
                                                                                </InputGroup.Text>
                                                                            </InputGroup>
                                                                        </Col>
                                                                        <Col xl={3}>
                                                                            <div className="lh-1">
                                                                                <span className="fw-medium">New Password :</span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xl={9}>
                                                                            <InputGroup>
                                                                                <Form.Control type={newPasswordVisible ? 'text' : 'password'} onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className="form-control" required placeholder='Password' />
                                                                                <InputGroup.Text className='bg-transparent shadow-none PasswordVisible ' onClick={() => { setNewPasswordVisible(!newPasswordVisible) }} style={{ width: '46px' }}>
                                                                                    <i className={newPasswordVisible ? "fa fa-eye" : "fa fa-eye-slash"} />
                                                                                </InputGroup.Text>
                                                                            </InputGroup>
                                                                        </Col>
                                                                        <Col xl={3}>
                                                                            <div className="lh-1">
                                                                                <span className="fw-medium">Confirm Password :</span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xl={9}>
                                                                            <InputGroup>
                                                                                <Form.Control type={ConfirmPasswordVisible ? 'text' : 'password'} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="form-control" required placeholder='Password' />
                                                                                <InputGroup.Text className='bg-transparent shadow-none PasswordVisible ' onClick={() => { setConfirmPasswordVisible(!ConfirmPasswordVisible) }} style={{ width: '46px' }}>
                                                                                    <i className={ConfirmPasswordVisible ? "fa fa-eye" : "fa fa-eye-slash"} />
                                                                                </InputGroup.Text>
                                                                            </InputGroup>
                                                                        </Col>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="d-flex justify-content-end mt-2">
                                                                <Button className="text-end" type="submit">Submit</Button>
                                                            </div>
                                                        </Form>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Tab.Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <!-- End:: row-1 --> */}
        </Fragment>
    )
};

export default Profile;