import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { LinkContainer } from "react-router-bootstrap";

import { getUserinfo } from "../config/getUser";
import { TrendingCoins } from "../config/api";
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const HomePage = () => {
	const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [coinType, setCoinType] = useState("");
	const [coins, setCoins] = useState([]);
	const [currency, symbol] = ["usd", "$"];

	useEffect(() => {
		// Fetch user data
		getUserinfo()
			.then((data) => {
        console.log(data);
        setName(data.data.name);
        const defwallet = data.data.walletids.defaultwallet;
        const defaultWalletObj = data.data.walletids.wallets.find((wallet) => wallet.walletAddress === defwallet);
        // setBalance(defaultWalletObj.walletHoldings)
        console.log(defaultWalletObj);
        setBalance(defaultWalletObj.walletHoldings.$numberDecimal);
        setCoinType(defaultWalletObj.walletType)
			})
			.catch((error) => {
				console.error(error);
			});
		// Fetch trending coins
		const fetchCoins = async () => {
			const response = await axios.get(TrendingCoins(currency));
			setCoins(response.data);
		};
		fetchCoins();
	}, []);

	return (
		<div className="container mt-4">
			<h1 className="text-center mb-4">Home</h1>
			<Card className="mb-4">
				<Card.Body>
					<h3 className="mb-3">My Account</h3>
					<p className="mb-2">Name: {name}</p>
					<p className="mb-0">
						Current Balance:
						{balance}{coinType}
					</p>
				</Card.Body>
			</Card>
			<h3 className="mb-3">Trending Coins</h3>
			<Table
				responsive
				striped
				bordered
				hover
				style={{ fontSize: 17 }}
			>
				<thead className="bg-primary text-light">
					<tr>
						<th>Coin</th>
						<th>Price</th>
						<th>24h Change</th>
						<th>Market Cap</th>
					</tr>
				</thead>
				<tbody>
					{coins.map((coin) => (
						<LinkContainer
							to={`/coin/${coin.id}`}
							style={{ cursor: "pointer" }}
						>
							<tr>
								<td>
									<img
										src={coin.image}
										alt={coin.name}
										height={30}
									/>{" "}
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
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default HomePage;
