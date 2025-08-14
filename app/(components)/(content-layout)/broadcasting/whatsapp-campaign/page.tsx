"use client";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import {
  Card,
  Col,
  Form,
  Row,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const WhatsappCampaign = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const campaigns = [
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
    {
      campaign_id: "702715",
      dateTime: "29-06-2025 15:37:30",
      schedule_dateTime: "NA",
      status: "Completed",
      campaignTitle: "Demome1",
      waba_no: "+919726426079",
      template_id: "857597",
      template: "Preview",
      file_count: 1,
      duplicate_count: 0,
      total: 1,
      submitted: 0,
      total_delivered: 0,
      delivered: 0,
      read: 0,
      failed: 1,
    },
  ];

  const totalCampaigns = campaigns.length;

  const totalPages = Math.ceil(totalCampaigns / rowsPerPage);

  const handleExportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(campaigns);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Campaigns");
    const buf = XLSX.write(wb, { bookType: "csv", type: "array" });
    const blob = new Blob([buf], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "campaigns.csv");
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(campaigns);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Campaigns");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "campaigns.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Sr.No.",
      "Campaign ID",
      "Datetime",
      "Schedule",
      "Status",
      "Title",
      "WABA",
      "Template ID",
      "Template",
      "File Count",
      "Dup.",
      "Total",
      "Subm.",
      "T.Deliv",
      "Deliv",
      "Read",
      "Fail",
    ];
    const tableRows = campaigns.map((c, i) => [
      i + 1,
      c.campaign_id,
      c.dateTime,
      c.schedule_dateTime,
      c.status,
      c.campaignTitle,
      c.waba_no,
      c.template_id,
      c.template,
      c.file_count,
      c.duplicate_count,
      c.total,
      c.submitted,
      c.total_delivered,
      c.delivered,
      c.read,
      c.failed,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("campaigns.pdf");
  };

  const handlePrint = () => {
    const tableEl = document.querySelector("table");
    if (!tableEl) return;

    const printWindow = window.open("", "", "height=800,width=1200");
    if (!printWindow) return;

    const tableHTML = tableEl.outerHTML;

    printWindow.document.write(`
    <html>
      <head>
        <title>Print Campaigns</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f8f8f8;
          }
        </style>
      </head>
      <body>
        <h2>Whatsapp Campaign Report</h2>
        ${tableHTML}
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function () {
              window.close();
            };
          };
        </script>
      </body>
    </html>
  `);
    printWindow.document.close();
  };

  return (
    <Fragment>
      <Seo title="Whatsapp Campaign" />
      <Pageheader title="Whatsapp" currentpage="Whatsapp Campaigns" />

      {/* Filters Section */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-4 text-primary">
            <i className="bi bi-funnel-fill me-2"></i>Filters
          </h5>
          <Form>
            <Row className="g-3 align-items-end">
              <Col md={1}>
                <Form.Label>Template ID</Form.Label>
                <Form.Control type="text" placeholder="Enter template id" />
              </Col>
              <Col md={2}>
                <Form.Label>From Date:</Form.Label>
                <Form.Control
                  placeholder="Enter date"
                  type="date"
                  // value={headerText}
                  // onChange={(e) => setHeaderText(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Label>To Date:</Form.Label>
                <Form.Control
                  placeholder="Enter date"
                  type="date"
                  // value={headerText}
                  // onChange={(e) => setHeaderText(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Label>Campaign Title:</Form.Label>
                <Form.Control
                  maxLength={60}
                  placeholder="Enter campaign title"
                  // value={headerText}
                  // onChange={(e) => setHeaderText(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Label>WABA No:</Form.Label>
                <Form.Control
                  maxLength={60}
                  placeholder="Enter sendor mobile number"
                  // value={headerText}
                  // onChange={(e) => setHeaderText(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Label>Mobile No:</Form.Label>
                <Form.Control
                  maxLength={60}
                  placeholder="Enter mobile number"
                  // value={headerText}
                  // onChange={(e) => setHeaderText(e.target.value)}
                />
              </Col>
              <Col md={1}>
                <Form.Label>Status</Form.Label>
                <Form.Select>
                  <option>--All--</option>
                  <option>Processing</option>
                  <option>Running</option>
                  <option>Stopped</option>
                  <option>Failed</option>
                  <option>Complete</option>
                  <option>Queued</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-3 g-1">
              <Col md={1}>
                <Button variant="primary" className="w-100">
                  Search
                </Button>
              </Col>
              <Col>
                <Link href="/broadcasting/whatsapp-campaign/add-whatsapp-campaign">
                  <Button variant="success">Create new campaign</Button>
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
            <i className="bi bi-table me-2"></i>Campaign Report
          </h5>
          <div className="d-flex gap-2 mb-3">
            <Button variant="outline-secondary" onClick={handleExportCSV}>
              <i className="bi bi-file-earmark-text me-1"></i> CSV
            </Button>
            <Button variant="outline-success" onClick={handleExportExcel}>
              <i className="bi bi-file-earmark-excel me-1"></i> Excel
            </Button>
            <Button variant="outline-danger" onClick={handleExportPDF}>
              <i className="bi bi-file-earmark-pdf me-1"></i> PDF
            </Button>
            <Button variant="outline-primary" onClick={handlePrint}>
              <i className="bi bi-printer me-1"></i> Print
            </Button>
          </div>

          <div className="table-responsive">
            <Table bordered hover>
              <thead className="table-light">
                <tr>
                  <th>Sr.No.</th>
                  <th>Campaign ID</th>
                  <th>Datetime</th>
                  <th>Schedule Datetime</th>
                  <th>Status</th>
                  <th>Campaign title</th>
                  <th>WABA no</th>
                  <th>Template ID</th>
                  <th>Template</th>
                  <th>File Count</th>
                  <th>Duplicate Count</th>
                  <th>Total/Unique</th>
                  <th>Submitted</th>
                  <th>Total Delivered</th>
                  <th>Delivered</th>
                  <th>Read</th>
                  <th>Failed</th>
                </tr>
              </thead>
              <tbody>
                {campaigns
                  .slice(
                    (currentPage - 1) * rowsPerPage,
                    currentPage * rowsPerPage
                  )
                  .map((campaign, idx) => (
                    <tr key={`${campaign.campaign_id}-${idx}`}>
                      <td>{(currentPage - 1) * rowsPerPage + idx + 1}</td>
                      <td>{campaign.campaign_id}</td>
                      <td>{campaign.dateTime}</td>
                      <td>{campaign.schedule_dateTime}</td>
                      <td className="text-success">{campaign.status}</td>
                      <td>{campaign.campaignTitle}</td>
                      <td>{campaign.waba_no}</td>
                      <td>{campaign.template_id}</td>
                      <td>{campaign.template}</td>
                      <td>{campaign.file_count}</td>
                      <td>{campaign.duplicate_count}</td>
                      <td className="text-primary">{campaign.total}</td>
                      <td className="text-primary">{campaign.submitted}</td>
                      <td>{campaign.total_delivered}</td>
                      <td className="text-primary">{campaign.delivered}</td>
                      <td className="text-primary">{campaign.read}</td>
                      <td className="text-primary">{campaign.failed}</td>
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
              {currentPage} / {totalPages} Total : {totalCampaigns}
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

export default WhatsappCampaign;
