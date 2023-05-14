import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";

function FAQPage() {
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  const toggleAnswer1 = () => setShowAnswer1(!showAnswer1);
  const toggleAnswer2 = () => setShowAnswer2(!showAnswer2);
  const toggleAnswer3 = () => setShowAnswer3(!showAnswer3);

  return (
    <Container className="mt-4">
      <h1 className="text-center my-4">FAQ</h1>

      <Card>
        <Card.Header>
          <Button onClick={toggleAnswer1} variant="light">
            What is cryptocurrency?
          </Button>
        </Card.Header>
        {showAnswer1 && (
          <Card.Body>
            Cryptocurrency is a digital or virtual currency that uses
            cryptography for security. It operates independently of a central
            bank and is decentralized, meaning that transactions are verified
            and recorded through a distributed ledger, usually a blockchain.
          </Card.Body>
        )}
      </Card>

      <Card>
        <Card.Header>
          <Button onClick={toggleAnswer2} variant="light">
            How do I buy cryptocurrency?
          </Button>
        </Card.Header>
        {showAnswer2 && (
          <Card.Body>
            There are many ways to buy cryptocurrency, including using a
            cryptocurrency exchange, peer-to-peer trading, or even buying
            directly from individuals. It is important to do your research and
            choose a reputable exchange or seller before making any purchases.
          </Card.Body>
        )}
      </Card>

      <Card>
        <Card.Header>
          <Button onClick={toggleAnswer3} variant="light">
            Is cryptocurrency secure?
          </Button>
        </Card.Header>
        {showAnswer3 && (
          <Card.Body>
            Cryptocurrency transactions are secure because they use cryptography
            for verification and protection against fraud. However, like any
            other technology, there are risks associated with using
            cryptocurrency, such as theft and hacking. It is important to take
            necessary precautions to protect your cryptocurrency assets.
          </Card.Body>
        )}
      </Card>
    </Container>
  );
}

export default FAQPage;
