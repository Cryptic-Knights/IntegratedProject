import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import QrCode from "qrcode.react";

const holdingData = [
  { id: "bitcoin", name: "Bitcoin", holdings: 2.5, costPrice: 54789.23 },
];

const TradePage = () => {
  const [currency, setCurrency] = useState("usd");
  const [selectedCrypto, setSelectedCrypto] = useState(holdingData[0]);
  const [tradeAmount, setTradeAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCryptoChange = (event) => {
    const crypto = holdingData.find((item) => item.id === event.target.value);
    setSelectedCrypto(crypto);
  };

  const handleTradeAmountChange = (event) => {
    setTradeAmount(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleTradeSubmit = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmTrade = () => {
    // make API call to send cryptocurrency to the user with the given userId
    // update user's holdingData and balance accordingly
    // show success message
    setShowConfirmationModal(false);
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const userBalance = 150000; // assume the user's current balance

  return (
    <Container className="p-4">
      <h1 className="text-center mb-4">Trade</h1>
      <Row>
        <Col md={6}>
          <h3>Send Crypto</h3>
          <Form>
            <Form.Group controlId="formCrypto">
              <Form.Label className="mt-3">Select Cryptocurrency</Form.Label>
              <Form.Control
                as="select"
                onChange={handleCryptoChange}
                className="mb-2"
              >
                {holdingData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={tradeAmount}
                onChange={handleTradeAmountChange}
                className="mb-2"
              />
            </Form.Group>

            <Form.Group controlId="formUserId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user ID"
                value={userId}
                onChange={handleUserIdChange}
                className="mb-2"
              />
            </Form.Group>

            <Button
              variant="primary"
              className="mt-3"
              onClick={handleTradeSubmit}
            >
              Send
            </Button>
          </Form>
        </Col>
        <Col md={6} style={{ textAlign: "right" }}>
          <h3>Receive Crypto</h3>
          <p className="mt-2">
            Please scan the following to recieve cryptocurrency:
          </p>
          <div className="d-flex align-items-center justify-content-end mb-3">
            <QrCode value="http://localhost:3000/trade" size={150} />
          </div>
          <div className="text-muted">
            Alternatively, you can use the ID: test2020
          </div>
        </Col>
      </Row>

      <Modal show={showConfirmationModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to send {tradeAmount} {selectedCrypto.name} to
          user {userId}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmTrade}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TradePage;
