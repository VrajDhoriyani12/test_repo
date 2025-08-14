"use client";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";

const SmsBroadcast = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedCompany, setSelectedCompany] = useState(
    "Neplen Infotech (+15793877407)"
  );
  const [selectedStatus, setSelectedStatus] = useState("");

  const templates = [
    {
      id: "1",
      name: "Neplen Campaign 1",
      smsApi: "+15793877407",
      status: "Sent",
      actions: "View",
      sent: "Yes",
      scheduledAt: "2023-10-01 10:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "2",
      name: "Neplen Campaign 2",
      smsApi: "+15793877407",
      status: "Scheduled",
      actions: "Edit",
      sent: "No",
      scheduledAt: "2023-10-02 11:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "3",
      name: "Neplen Campaign 3",
      smsApi: "+15793877407",
      status: "Pending",
      actions: "Delete",
      sent: "No",
      scheduledAt: "2023-10-03 12:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "4",
      name: "Neplen Campaign 4",
      smsApi: "+15793877407",
      status: "Approved",
      actions: "View",
      sent: "Yes",
      scheduledAt: "2023-10-04 13:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "5",
      name: "Neplen Campaign 5",
      smsApi: "+15793877407",
      status: "Sent",
      actions: "Edit",
      sent: "Yes",
      scheduledAt: "2023-10-05 14:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "6",
      name: "Neplen Campaign 6",
      smsApi: "+15793877407",
      status: "Scheduled",
      actions: "Delete",
      sent: "No",
      scheduledAt: "2023-10-06 15:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "7",
      name: "Neplen Campaign 7",
      smsApi: "+15793877407",
      status: "Pending",
      actions: "View",
      sent: "No",
      scheduledAt: "2023-10-07 16:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "8",
      name: "Neplen Campaign 8",
      smsApi: "+15793877407",
      status: "Approved",
      actions: "Edit",
      sent: "Yes",
      scheduledAt: "2023-10-08 17:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "9",
      name: "Neplen Campaign 9",
      smsApi: "+15793877407",
      status: "Sent",
      actions: "Delete",
      sent: "Yes",
      scheduledAt: "2023-10-09 18:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "10",
      name: "Neplen Campaign 10",
      smsApi: "+15793877407",
      status: "Scheduled",
      actions: "View",
      sent: "No",
      scheduledAt: "2023-10-10 19:00:00",
      company: "Neplen Infotech (+15793877407)",
    },
    {
      id: "11",
      name: "Test Campaign 1",
      smsApi: "+1234567890",
      status: "Sent",
      actions: "View",
      sent: "Yes",
      scheduledAt: "2023-10-01 10:00:00",
      company: "Test Number (15550796063)",
    },
    {
      id: "12",
      name: "Test Campaign 2",
      smsApi: "+1234567890",
      status: "Scheduled",
      actions: "Edit",
      sent: "No",
      scheduledAt: "2023-10-02 11:00:00",
      company: "Test Number (15550796063)",
    },
    {
      id: "13",
      name: "Test Campaign 3",
      smsApi: "+1234567890",
      status: "Pending",
      actions: "Delete",
      sent: "No",
      scheduledAt: "2023-10-03 12:00:00",
      company: "Test Number (15550796063)",
    },
    {
      id: "14",
      name: "Test Campaign 4",
      smsApi: "+1234567890",
      status: "Approved",
      actions: "View",
      sent: "Yes",
      scheduledAt: "2023-10-04 13:00:00",
      company: "Test Number (15550796063)",
    },
    {
      id: "15",
      name: "Test Campaign 5",
      smsApi: "+1234567890",
      status: "Sent",
      actions: "Edit",
      sent: "Yes",
      scheduledAt: "2023-10-05 14:00:00",
      company: "Test Number (15550796063)",
    },
    {
      id: "16",
      name: "Test Campaign 6",
      smsApi: "+1234567890",
      status: "Scheduled",
      actions: "Delete",
      sent: "No",
      scheduledAt: "2023-10-06 15:00:00",
      company: "Test Number (15550796063)",
    },
    {
      id: "17",
      name: "Test Campaign 7",
      smsApi: "+1234567890",
      status: "Pending",
      actions: "View",
      sent: "No",
      scheduledAt: "2023-10-07 16:00:00",
      company: "Test Number (15550796063)",
    },
    {
      id: "18",
      name: "Test Campaign 8",
      smsApi: "+1234567890",
      status: "Approved",
      actions: "Edit",
      sent: "Yes",
      scheduledAt: "2023-10-08 17:00:00",
      company: "Test Number (15550796063)",
    },
    {
      id: "19",
      name: "Test Campaign 9",
      smsApi: "+1234567890",
      status: "Sent",
      actions: "Delete",
      sent: "Yes",
      scheduledAt: "2023-10-09 18:00:00",
      company: "Test Number (15550796063)",
    },
    {
      id: "20",
      name: "Test Campaign 10",
      smsApi: "+1234567890",
      status: "Scheduled",
      actions: "View",
      sent: "No",
      scheduledAt: "2023-10-10 19:00:00",
      company: "Test Number (15550796063)",
    },
  ];

  const filteredTemplates = templates.filter(
    (template) =>
      template.company === selectedCompany &&
      (selectedStatus === "" || template.status === selectedStatus)
  );

  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalTemplates = filteredTemplates.length;

  const totalPages = Math.ceil(totalTemplates / rowsPerPage);

  return (
    <Fragment>
      <Seo title="SMS Broadcast" />
      <Pageheader title="Broadcasting" currentpage="SMS Broadcast" />

      {/* Filters Section */}
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <Form.Select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  <option>Neplen Infotech (+15793877407)</option>
                  <option>Test Number (15550796063)</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Sent">Sent</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Control type="text" placeholder="Search & Enter" />
              </Col>
            </Row>
            <Row className="mt-3 g-1">
              <Col>
                <Link href="/broadcasting/sms-broadcast/add-sms-broadcast">
                  <Button variant="success">Add new sms broadcast</Button>
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
            <i className="bi bi-table me-2"></i>SMS Broadcast Report
          </h5>
          <div className="table-responsive">
            <Table bordered hover>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Campaign Name</th>
                  <th>SMS API</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Sent</th>
                  <th>Scheduled At</th>
                </tr>
              </thead>
              <tbody>
                {filteredTemplates
                  .slice(
                    (currentPage - 1) * rowsPerPage,
                    currentPage * rowsPerPage
                  )
                  .map((template, idx) => (
                    <tr key={`${template.id}-${idx}`}>
                      <td>{template.id}</td>
                      <td>{template.name}</td>
                      <td>{template.smsApi}</td>
                      <td>
                        <span className="badge bg-success d-flex align-items-center gap-1">
                          <i className="bi bi-check-circle-fill"></i>{" "}
                          {template.status}
                        </span>
                      </td>
                      <td>{template.actions}</td>
                      <td>{template.sent}</td>
                      <td>{template.scheduledAt}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center flex-wrap">
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
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default SmsBroadcast;
