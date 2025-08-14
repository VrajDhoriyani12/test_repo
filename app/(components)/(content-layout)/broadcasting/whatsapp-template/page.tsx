"use client";

import { activeLanguageApi, searchWhatsappTemplateApi, whatsappTemplateApi } from "@/app/(components)/Configs/Utils/APIs/Admin_Apis";
import SpkButton from "@/shared/@spk-reusable-components/reusable-uielements/spk-button";
import SpkTooltips from "@/shared/@spk-reusable-components/reusable-uielements/spk-tooltips";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import moment from "moment";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  Table,
  Button,
  Pagination,
  Spinner,
} from "react-bootstrap";
import Select from 'react-select';
import { toast } from "react-toastify";

const WhatsappTemplate = () => {

  const themeSelect = (theme: any) => ({ ...theme, borderRadius: 10, colors: { ...theme.colors, primary25: '#EBECF0', primary: 'rgb(38, 132, 255)', }, });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [totalPage, setTotalPage] = useState<any>();
  const [languageListing, setLanguageListing] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<any>('');
  console.log("🚀 ~ WhatsappTemplate ~ category:", category)
  const [type, setType] = useState<any>('');
  console.log("🚀 ~ WhatsappTemplate ~ type:", type)
  const [language, setLanguage] = useState<any>('');
  const [status, setStatus] = useState<any>('');
  const [prevSearch, setPrevSearch] = useState<any>();

  const categoryOpt = [
    { value: '', label: '--All--' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'utility', label: 'Utility' },
  ]

  const typeOpt = [
    { value: '', label: '--All--' },
    { value: 'Document', label: 'Document' },
    { value: 'Image', label: 'Image' },
    { value: 'Video', label: 'Video' },
    { value: 'Location', label: 'Location' },
    { value: 'Carousel', label: 'Carousel' },
    { value: 'Text', label: 'Text' },
  ]

  const statusOpt = [
    { value: '', label: '--All--' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Bad Request', label: 'Bad Request' },
    { value: 'Invalid Request', label: 'Invalid Request' },
    { value: 'Flagged', label: 'Flagged' },
    { value: 'In Review', label: 'In Review' },
  ]

  const templates = [
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
    {
      id: "871635",
      name: "send_daily_treatment",
      preview: "Preview",
      category: "Utility",
      language: "English",
      dateTime: "17-07-2025 17:37:26",
      status: "Approved",
    },
  ];

  const activeLanguage = async () => {
    setLoading(true)

    const response = await activeLanguageApi()
    if (response.status === 200) {
      const data = response.data.language.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }))
      setLanguageListing([{ value: '', label: '--All--' }, ...data])

      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    activeLanguage()
  }, [])

  const whatsappTemplate = async () => {
    setLoading(true)

    const response = await whatsappTemplateApi(currentPage)
    console.log("🚀 ~ whatsappTemplate ~ response:", response)
    if (response.status === 200) {
      setLoading(false)
      setData(response.data.findData)
      setTotalRecord(response.data.totalCount)
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
    if (!search && !category.value && !type.value && !language.value && !status.value) {
      whatsappTemplate()
    }
  }, [search, category, type, language, status, currentPage])

  const handleSearchFunction = async () => {
    setLoading(true)
    const response = await searchWhatsappTemplateApi(search, category?.value ?? '', type?.value ?? '', language?.value ?? '', status?.value ?? '', currentPage)
    if (response.status === 200) {
      setLoading(false)
      setData(response.data.findData)
      setTotalRecord(response.data.totalCount)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (search || category || type || language || status) {
      whatsappTemplate()
    }
  }, [currentPage])

  const handleSearch = (e: any) => {
    e.preventDefault();

    const hasChanged = prevSearch?.search !== search ||
      prevSearch?.category !== category ||
      prevSearch?.type !== type ||
      prevSearch?.language !== language ||
      prevSearch?.status !== status;

    if (hasChanged && (search || category || type || language || status)) {
      handleSearchFunction()
      setCurrentPage(1);
      setPrevSearch({ search, category, type, language, status })
    }
  }

  const handleResetFilter = () => {
    setSearch('')
    setCategory({ value: '', label: '--All--' })
    setType({ value: '', label: '--All--' })
    setLanguage({ value: '', label: '--All--' })
    setStatus({ value: '', label: '--All--' })
  }

  useEffect(() => {
    if (totalRecord || totalRecord === 0) {
      const perPage = Math.ceil(totalRecord / limit);
      setTotalPage(perPage);
    }
  }, [totalRecord]);

  return (
    <Fragment>
      <Seo title="Whatsapp Template" />
      <Pageheader title="Whatsapp" currentpage="Whatsapp Templates" />

      {/* Filters Section */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-4 text-primary">
            <i className="bi bi-funnel-fill me-2"></i>Filters
          </h5>
          <Form onSubmit={handleSearch}>
            <Row className="g-3 align-items-end">
              <Col lg={4} md={6}>
                <Form.Label>Template name</Form.Label>
                <Form.Control type="text" placeholder="Enter template name" value={search} onChange={(e: any) => setSearch(e.target.value)} />
              </Col>
              <Col lg={2} md={6}>
                <Form.Label>Category</Form.Label>
                <Select options={categoryOpt} theme={themeSelect} placeholder="--All--" value={category} onChange={(e: any) => setCategory(e)} />
              </Col>
              <Col lg={2} md={6}>
                <Form.Label>Type</Form.Label>
                <Select options={typeOpt} theme={themeSelect} placeholder="--All--" value={type} onChange={(e: any) => setType(e)} />
              </Col>
              <Col lg={2} md={6}>
                <Form.Label>Language</Form.Label>
                <Select options={languageListing} theme={themeSelect} placeholder="--All--" value={language} onChange={(e: any) => setLanguage(e)} />
              </Col>
              <Col lg={2} md={6}>
                <Form.Label>Status</Form.Label>
                <Select options={statusOpt} theme={themeSelect} placeholder="--All--" value={status} onChange={(e: any) => setStatus(e)} />
              </Col>
            </Row>
            <Row className="mt-3 g-1">
              <Col xl={1} sm={2}>
                <Button variant="primary" type="submit" className="w-100">
                  Search
                </Button>
              </Col>
              <Col xl={1} sm={2}>
                <Button variant="secondary" className="w-100" onClick={handleResetFilter}>
                  Reset
                </Button>
              </Col>
              <Col>
                <Link href="/broadcasting/whatsapp-template/add-whatsapp-template">
                  <Button variant="success" className="add-whatsapp-template-btn">Add new whatsapp template</Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Table Section */}
      <Card>
        <Card.Body>
          <h5 className="mb-3 text-primary">
            <i className="bi bi-table me-2"></i>Whatsapp Template Report
          </h5>
          <div className="table-responsive">
            <Table className="text-nowrap table-bordered border-primary table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">Sr.No.</th>
                  <th scope="col" className="text-center">Template ID</th>
                  <th scope="col" className="text-center">Template name</th>
                  <th scope="col" className="text-center">Preview</th>
                  <th scope="col" className="text-center">Category</th>
                  <th scope="col" className="text-center">Language</th>
                  <th scope="col" className="text-center">Date/Time</th>
                  <th scope="col" className="text-end">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  !loading && data?.length > 0 ? (
                    data.map((item: any, index: any) => {

                      const formattedDate = moment(item.createdAt).format('DD-MM-YYYY')
                      const formattedTime = moment(item.createdAt).format('h:mm A')

                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="text-center">{item.template_id}</td>
                          <td className="text-start">
                            <Link href={''} className="text-decoration-none fw-semibold fs-6">{item.template_name}</Link> <br />
                            <span className="fw-bolder">Placeholders: {item.body_placeholders.length}</span>
                          </td>
                          <td className="text-center">
                            <div className="btn-list">
                              <SpkTooltips placement={'top'} title={item.body_message} tooltipClass="tooltip-light">
                                <SpkButton Buttontype="button" Buttonvariant="light">
                                  preview
                                </SpkButton>
                              </SpkTooltips>
                            </div>
                          </td>
                          <td className="text-center">{item.category}</td>
                          <td className="text-center">{item.language_id_data?.name ?? '-'}</td>
                          <td className="text-center">{formattedDate} <br /> {formattedTime}</td>
                          <td className='text-end' style={{ minWidth: "150px" }}>
                            <div className={`text-capitalize appointment ${item.status}`}><i className="fa-solid fa-hourglass-half"></i> {item.status}</div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={12} className='text-center'>
                        {loading ? <Spinner color="primary" animation="border" /> : "No data found"}
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </div>
        </Card.Body>
        {/* <Card.Footer className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <Form.Select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              style={{ width: "80px" }}
              className="me-2"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Form.Select>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Button
              variant="light"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              First
            </Button>
            <Button
              variant="light"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="px-2 fw-semibold bg-primary text-white rounded py-1">
              {currentPage} / {totalPages} Total : {totalTemplates}
            </span>
            <Button
              variant="light"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
            <Button
              variant="light"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              Last
            </Button>
          </div>
        </Card.Footer> */}
      </Card>
    </Fragment>
  );
};

export default WhatsappTemplate;
