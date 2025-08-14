"use client";

import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const WhatsappCampaignForm = () => {
  const [campaignTitle, setCampaignTitle] = useState("");
  const [contacts, setContacts] = useState("");
  const [template, setTemplate] = useState("");
  const [allowDuplicate, setAllowDuplicate] = useState(false);
  const [allowEncryption, setAllowEncryption] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [scheduleType, setScheduleType] = useState("immediate");
  const [scheduleDateTime, setScheduleDateTime] = useState("");
  const [templateType, setTemplateType] = useState("");
  const [mediaUrlType, setMediaUrlType] = useState("common");
  const [mediaUrl, setMediaUrl] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (allowedTypes.includes(selectedFile.type)) {
        setError("");
        setFile(selectedFile);
      } else {
        setError("Please upload a valid file: .csv, .xls, .xlsx");
        setFile(null);
      }
    }
  };

  const templateOptionsMap: Record<string, string[]> = {
    Document: [
      "send_quotation (en)",
      "invoice_generated (en)",
      "resort_invoice_generate (en)",
      "send_daily_treatment",
      "resort_treatment_video_massage_with_pdf (en)",
      "resort_invoice_generate (en)",
      "resort_receipt_generate (en)",
      "revise_booking_confirmation_resort (en)",
      "booking_confirmation_report (en)",
      "inquiry_followup_message_attachment (en)",
      "personalized_diet_chart_new1 (en)",
      "discharge_confirmation_new1 (en)",
      "personalized_treatment_chart_new (en)",
      "medicine_chart (en)",
      "send_quotation (en)",
      "payment_confirmation_new (en)",
      "ledger_confirmation_b2b (en)",
      "package_broucher_pdf (en)",
      "token_amount_receipt (en)",
      "welcome_call_parivar_pass (en)",
      "invoice_generated (en)",
      "mou_successfully_passedwithpdf (en)",
      `success_mou_converted2(en)`,
    ],
    Image: ["demo (en)", "add_new (en)", "test01 (en)"],
    Video: [
      "resort_treatment_video_massage_with_pdf (en)",
      "mou_successfully_passedwithpdf (en)",
    ],
    Text: [
      "schedule_activity (en)",
      "hospital_appnt_request_1 (en)",
      "hospital_appnt_confirm_1 (en)",
    ],
    Location: ["location_share_template (en)"],
    Carousel: ["carousel_offer_template (en)"],
  };

  const templateMessageMap: Record<
    string,
    { message: string; sampleFileName: string }
  > = {
    send_daily_treatment: {
      message: `*Dear {{1}},*

We are delighted to welcome you to the Wellness Mahotsav Treatment Program at our center. Your journey to holistic healing, balance, and vitality begins here! 🌞

The attached PDF is your the date {{2}} Treatment Schedule to be followed during your stay with us.

Please make sure to follow the timings for the best results. Our wellness team is always here to support you throughout your healing journey.

Wishing you a peaceful and rejuvenating experience! 🌸

Warm regards,
Team Wellness Mahotsav`,
      sampleFileName: "send_daily_treatment.xlsx",
    },

    // Add others
  };

  const templateData = templateMessageMap[template];
  const finalMessage = templateData ? templateData.message : customMessage;

  return (
    <div className="container py-4">
      <h4 className="mb-3">Campaign Form</h4>
      <Card className="p-3">
        <Form>
          {/* Schedule Campaign */}
          <Form.Group className="mb-3">
            <div className="d-flex gap-3 align-items-center">
              <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
                Schedule campaign:
              </Form.Label>
              <Form.Check
                type="radio"
                label="Immediate"
                name="schedule"
                value="immediate"
                checked={scheduleType === "immediate"}
                onChange={(e) => setScheduleType(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Schedule"
                name="schedule"
                value="schedule"
                checked={scheduleType === "schedule"}
                onChange={(e) => setScheduleType(e.target.value)}
              />
            </div>
          </Form.Group>

          {/* Conditionally Render Schedule Date-Time Input */}
          {scheduleType === "schedule" && (
            <Form.Group className="mb-3 d-flex align-items-center gap-3">
              <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
                Schedule Date Time: <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="datetime-local"
                value={scheduleDateTime}
                onChange={(e) => setScheduleDateTime(e.target.value)}
              />
            </Form.Group>
          )}

          {/* Campaign Title */}
          <Form.Group className="mb-3 d-flex align-items-center gap-3">
            <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
              Campaign title: <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter campaign title"
              value={campaignTitle}
              onChange={(e) => setCampaignTitle(e.target.value)}
            />
          </Form.Group>

          {/* Contacts */}
          <Form.Group className="mb-3 d-flex align-items-center gap-3">
            <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
              Contacts: <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
            >
              <option>--Select--</option>
              <option>+919726426079</option>
            </Form.Select>
          </Form.Group>

          {/* Template Type */}
          <Form.Group className="mb-3 d-flex align-items-center gap-3">
            <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
              Template type: <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={templateType}
              onChange={(e) => {
                const value = e.target.value;
                setTemplateType(value);
                if (value !== "Document") {
                  setMediaUrlType("common");
                  setMediaUrl("");
                }
              }}
            >
              <option>--Select--</option>
              <option>Document</option>
              <option>Image</option>
              <option>Video</option>
              <option>Text</option>
              <option>Location</option>
              <option>Carousel</option>
            </Form.Select>
          </Form.Group>

          {/* Media URL Type (only if Document is selected) */}
          {["Document", "Video", "Image"].includes(templateType) && (
            <>
              <Form.Group className="mb-3 d-flex align-items-center gap-3">
                <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
                  Media URL Type:
                </Form.Label>
                <Form.Check
                  type="radio"
                  label="Common URL"
                  name="mediaUrlType"
                  value="common"
                  checked={mediaUrlType === "common"}
                  onChange={(e) => setMediaUrlType(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Dynamic URL"
                  name="mediaUrlType"
                  value="dynamic"
                  checked={mediaUrlType === "dynamic"}
                  onChange={(e) => setMediaUrlType(e.target.value)}
                />
              </Form.Group>

              {/* Media URL input (only if common is selected) */}
              {mediaUrlType === "common" && (
                <Form.Group className="mb-3 d-flex align-items-center gap-3">
                  <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
                    Media URL:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter media URL"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                  />
                </Form.Group>
              )}
            </>
          )}

          {templateType === "Carousel" && (
            <>
              <Form.Group className="mb-3 d-flex align-items-center gap-3">
                <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
                  Media URL Type:
                </Form.Label>
                <Form.Check
                  type="radio"
                  label="Media ID"
                  name="mediaUrlType"
                  value="id"
                  onChange={(e) => setMediaUrlType(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Media URL"
                  name="mediaUrlType"
                  value="url"
                  onChange={(e) => setMediaUrlType(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          {/* Template */}

          <Form.Group className="mb-3 d-flex align-items-center gap-3">
            <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
              Template: <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              disabled={!templateType}
            >
              <option>--Select--</option>
              {templateOptionsMap[templateType]?.map((templateOption, idx) => (
                <option key={idx} value={templateOption}>
                  {templateOption}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 d-flex align-items-start gap-3">
            <Form.Label className="mb-0 pt-2" style={{ minWidth: "160px" }}>
              Message: <span className="text-danger">*</span>
            </Form.Label>
            <div className="w-100">
              {templateData && (
                <div className="mb-2">
                  <button
                    className="btn text-primary"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = `/samples/${templateData.sampleFileName}`;
                      link.download = templateData.sampleFileName;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Download Sample XLSX
                  </button>
                </div>
              )}
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="Enter message"
                value={finalMessage}
                onChange={(e) => {
                  if (!templateData) {
                    setCustomMessage(e.target.value);
                  }
                }}
                readOnly={!!templateData}
              />
            </div>
          </Form.Group>

          {/* Allow Duplicate Number */}
          <Form.Group className="mb-3 d-flex align-items-center gap-3">
            <Form.Label className="mb-0" style={{ minWidth: "160px" }}>
              {/* Empty space for alignment */}
            </Form.Label>
            <Form.Check
              type="checkbox"
              label="Allow duplicate number"
              checked={allowDuplicate}
              onChange={(e) => setAllowDuplicate(e.target.checked)}
            />
          </Form.Group>

          {/* Allow Encryption */}
          <Form.Group className="mb-3 d-flex align-items-center gap-3">
            <Form.Label className="mb-0" style={{ minWidth: "160px" }} />
            <Form.Check
              type="checkbox"
              label="Allow encryption for this campaign"
              checked={allowEncryption}
              onChange={(e) => setAllowEncryption(e.target.checked)}
            />
          </Form.Group>

          {/* File Upload */}
          <Form.Group className="mb-3">
            <div className="d-flex align-items-start gap-3">
              <Form.Label className="mb-0 pt-2" style={{ minWidth: "160px" }}>
                Upload file: <span className="text-danger">*</span>
              </Form.Label>
              <div className="w-100">
                <Form.Control type="file" onChange={handleFileChange} />
                {error && (
                  <div className="text-danger mt-2">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                {/* File note below */}
                <div className="text-danger mt-2">
                  Note: Please upload file with country code. Allowed formats:
                  csv, xls, xlsx
                </div>
              </div>
            </div>
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex gap-2 justify-content-start mt-3">
            <Button variant="success">Save</Button>
            <Button variant="danger">Cancel</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default WhatsappCampaignForm;
