import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { SingleCoin } from "../config/api";
import axios from "axios";

const data = [
  { id: "bitcoin", name: "Bitcoin", holdings: 2.5, costPrice: 54789.23 },
  { id: "ethereum", name: "Ethereum", holdings: 10, costPrice: 2574.89 },
  { id: "litecoin", name: "Litecoin", holdings: 50, costPrice: 200.45 },
];

function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function PortfolioPage() {
  const [holdings, setHoldings] = useState([]);
  const [balance, setBalance] = useState(12500.0);
  const [holdingsBalance, setHoldingsBalance] = useState(0);
  const [currency, symbol] = ["usd", "$"];

  useEffect(() => {
    const fetchCoins = async () => {
      const finalData = [];

      await Promise.all(
        data.map(async (coin) => {
          const response = await axios.get(SingleCoin(coin.id));
          const coinData = response.data;
          const price = coinData.market_data.current_price[currency];
          const value = price * coin.holdings;
          const change = (value - coin.costPrice) / 100;
          const image = coinData.image.large;

          finalData.push({
            ...coin,
            image,
            price,
            value,
            change,
          });
        })
      );

      return finalData;
    };
    fetchCoins().then((data) => {
      setHoldings(data);
      setHoldingsBalance(data.reduce((acc, curr) => acc + curr.value, 0));
    });
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Portfolio</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>Total Balance</Card.Header>
            <Card.Body>
              <h3>
                Available Balance: {symbol}
                {numberWithCommas(balance)}
              </h3>
              <p>
                Holdings: {symbol}
                {numberWithCommas(holdingsBalance)}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover style={{ fontSize: 16 }}>
            <thead className="bg-primary text-light">
              <tr>
                <th>Name</th>
                <th>% Change</th>
                <th>Holdings</th>
                <th>Buying Price</th>
                <th>Current Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <tr key={index}>
                  <td>
                    <img src={holding.image} alt={holding.name} height={30} />{" "}
                    {holding.name}
                  </td>
                  <td
                    className={
                      holding.change < 0 ? "text-danger" : "text-success"
                    }
                  >
                    {holding.change > 0 && "+"}
                    {numberWithCommas(holding.change?.toFixed(2))}%
                  </td>
                  <td>
                    {holding.holdings} {holding.name}
                  </td>
                  <td>
                    $
                    {numberWithCommas(
                      (holding.costPrice / holding.holdings)?.toFixed(2)
                    )}
                  </td>
                  <td>${numberWithCommas(holding.price?.toFixed(2))}</td>
                  <td>${numberWithCommas(holding.value?.toFixed(2))}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default PortfolioPage;
