"use client";

import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const CreateSMSCampaignForm = () => {
  const [campaignName, setCampaignName] = useState("");
  const [selectedAPI, setSelectedAPI] = useState("");
  const [message, setMessage] = useState("");
  const [whatsappBot, setWhatsappBot] = useState("");
  const [delay, setDelay] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [sendNow, setSendNow] = useState(true);

  // const targetLabels = ["Promos", "Engaged", "New Users"];
  // const excludeLabels = ["Blocked", "Opted Out"];
  const whatsappSubscribersCount =
    whatsappBot === "bot1" ? 16 : whatsappBot === "bot2" ? 2 : 0;
  const targetedReachCount =
    whatsappBot === "bot1" ? 16 : whatsappBot === "bot2" ? 2 : 0;

  const insertTag = (tag: string) => {
    setMessage((prev) => prev + ` #${tag}#`);
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3">Create SMS Campaign</h4>
      <p>Create a new SMS campaign</p>

      <Card className="p-4">
        <h5>Campaign Details</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control
                placeholder="Enter campaign name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>SMS API</Form.Label>
              <Form.Select
                value={selectedAPI}
                onChange={(e) => setSelectedAPI(e.target.value)}
              >
                <option>Select API</option>
                <option value="api1">Neplen Infotech (+15793877407)</option>
                <option value="api2">Test Number (15550796063)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>
            Message
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              onClick={() => insertTag("FIRST_NAME")}
            >
              First Name
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-1"
              onClick={() => insertTag("LAST_NAME")}
            >
              Last Name
            </Button>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            maxLength={1024}
            placeholder="Enter template message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <small>{message.length}/1024</small>
        </Form.Group>

        <h5 className="mt-4">Whatsapp Subscribers</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Whatsapp Subscribers</Form.Label>
              <Form.Control
                placeholder="0"
                disabled
                value={whatsappSubscribersCount}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Targeted Reach</Form.Label>
              <Form.Control
                placeholder="0"
                disabled
                value={targetedReachCount}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Select WhatsApp Bot</Form.Label>
          <Form.Select
            value={whatsappBot}
            onChange={(e) => setWhatsappBot(e.target.value)}
          >
            <option>Select Bot</option>
            <option value="bot1">Neplen Infotech (+15793877407)</option>
            <option value="bot2">Test Number (15550796063)</option>
          </Form.Select>
        </Form.Group>

        {/* Show target/exclude labels when Neplen bot is selected */}
        {whatsappBot && (
          <>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Target Labels</Form.Label>
                  {/* <Form.Select multiple disabled>
                    {targetLabels.map((label) => (
                      <option key={label}>{label}</option>
                    ))}
                  </Form.Select> */}
                  <Form.Control placeholder="Enter target labels" type="text" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Exclude Labels</Form.Label>
                  {/* <Form.Select multiple disabled>
                    {excludeLabels.map((label) => (
                      <option key={label}>{label}</option>
                    ))}
                  </Form.Select> */}
                  <Form.Control
                    placeholder="Enter exclude labels"
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        <h5 className="mt-4">Scheduling</h5>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Delay (Seconds)</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 10"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                placeholder="+92"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Actions</Form.Label>
              <Form.Select>
                <option>Actions</option>
                <option>Add</option>
                <option>Remove</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Check
            type="switch"
            id="send-now-switch"
            label="Send Now"
            checked={sendNow}
            onChange={() => setSendNow(!sendNow)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="primary">📤 Create Campaign</Button>
          <Button variant="outline-danger">✖ Cancel</Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateSMSCampaignForm;
