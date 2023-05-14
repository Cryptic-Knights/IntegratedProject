import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import { CoinList } from "../config/api";
import { LinkContainer } from "react-router-bootstrap";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function SearchPage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [currency, symbol] = ["usd", "$"];

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  function handleSearch() {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  }

  return (
    <Container style={{ padding: 15 }}>
      <Form.Group controlId="search">
        <InputGroup style={{ marginTop: 15 }} className="mb-4">
          <FormControl
            style={{ padding: 10 }}
            placeholder="What are you looking for?"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Table
        striped
        bordered
        hover
        responsive
        style={{ fontSize: 17, marginTop: 15 }}
      >
        <thead className="bg-primary text-light">
          <tr>
            {["Coins", "Price", "24h Change", "Market Cap"].map((e) => (
              <th key={e}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {handleSearch()
            .slice((page - 1) * 15, page * 15)
            .map((coin) => {
              return (
                <LinkContainer
                  to={`/coin/${coin.id}`}
                  style={{ cursor: "pointer" }}
                >
                  <tr id={coin.name}>
                    <td>
                      <img src={coin.image} alt={coin.name} height={30} />{" "}
                      <span className="ml-2">{coin.name}</span>
                    </td>
                    <td>
                      {symbol} {numberWithCommas(coin.current_price)}
                    </td>
                    <td
                      className={
                        coin.price_change_percentage_24h < 0
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {coin.price_change_percentage_24h > 0 && "+"}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>
                      {symbol} {numberWithCommas(coin.market_cap)}
                    </td>
                  </tr>
                </LinkContainer>
              );
            })}
        </tbody>
      </Table>

      <Pagination style={{ marginTop: 15 }}>
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        {Array.from({ length: Math.ceil(handleSearch().length / 15) }).map(
          (_, i) => (
            <Pagination.Item
              key={i}
              active={page === i + 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          disabled={page === Math.ceil(handleSearch().length / 10)}
          onClick={() => setPage(page + 1)}
        />
      </Pagination>
    </Container>
  );
}

export default SearchPage;
