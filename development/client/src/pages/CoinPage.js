import React, { useEffect, useState } from "react";
import { HistoricalChart, SingleCoin } from "../config/api";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
	ButtonGroup,
	Button,
	Container,
	Col,
	Row,
	Image,
	p,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

function numberWithCommas(x) {
	return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CoinPage() {
	const [coin, setCoin] = useState();
	const { id } = useParams();

	const chartDays = [
		{
			label: "24 Hours",
			value: 1,
		},
		{
			label: "30 Days",
			value: 30,
		},
		{
			label: "3 Months",
			value: 90,
		},
		{
			label: "1 Year",
			value: 365,
		},
	];

	const [historicalData, setHistoricalData] = useState();
	const [days, setDays] = useState(1);

	const [currency, symbol] = ["usd", "$"];

	const fetchData = (id) => {
		axios
			.get(HistoricalChart(id, days, currency))
			.then(({ data }) => data.prices)
			.then((data) => setHistoricalData(data));
	};

	const fetchCoin = () => {
		axios.get(SingleCoin(id)).then(({ data }) => {
			setCoin(data);
			fetchData(data.id);
		});
	};

	useEffect(() => {
		fetchCoin();
	}, [currency, days]);

	return (
		<Container className="mt-4">
			<Row>
				<Col md={4}>
					{coin && (
						<>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									width: "100%",
								}}
								className="mt-4"
							>
								<Image
									src={coin.image && coin.image.large}
									alt={coin.name}
									height={125}
								/>
								<h2 className="mt-2">{coin.name}</h2>
							</div>
							<h6 className="mt-4">
								{coin.description && coin.description.en.split(". ")[0]}
								.
							</h6>
							<div className="mt-4">
								<h5 style={{ display: "flex" }}>
									<span>Rank: </span> &nbsp; &nbsp;
									<span>{coin.market_cap_rank}</span>
								</h5>
								<h5 style={{ display: "flex" }}>
									<span>Current Price: </span> &nbsp; &nbsp;
									<span>
										{symbol}{" "}
										{coin.market_data &&
											numberWithCommas(
												coin.market_data.current_price[
													currency.toLowerCase()
												].toFixed(2)
											)}
									</span>
								</h5>
								<h5 style={{ display: "flex" }}>
									<span>Market Cap: </span> &nbsp; &nbsp;
									<span>
										{symbol}{" "}
										{coin.market_data &&
											numberWithCommas(
												coin.market_data.market_cap[
													currency.toLowerCase()
												]
											)}
									</span>
								</h5>
								<div className="mt-5 d-flex justify-content-center">
									<button
										className="btn btn-primary me-4"
										style={{ width: "80px" }}
									>
										Buy
									</button>
									<button
										className="btn btn-danger"
										style={{ width: "80px" }}
									>
										Sell
									</button>
								</div>
							</div>
						</>
					)}
				</Col>
				<Col md={8}>
					<div className="container mt-4">
						{historicalData && (
							<>
								<Line
									data={{
										labels: historicalData.map((state) => {
											let date = new Date(state[0]);
											let time =
												date.getHours > 12
													? `${
															date.getHours() - 12
													  }:${date.getHours()} PM`
													: `${date.getHours()}:${date.getHours()} AM`;
											return days === 1
												? time
												: date.toLocaleDateString();
										}),

										datasets: [
											{
												data: historicalData.map(
													(state) => state[1]
												),
												label: ` ${coin.name} to ${currency} Chart`,
												borderColor: "#008cba",
											},
										],
									}}
									options={{
										elements: {
											point: {
												radius: 1,
											},
										},
										plugins: {
											zoom: {
												zoom: {
													wheel: {
														enabled: true,
													},
													pinch: {
														enabled: true,
													},
													mode: "xy",
												},
												pan: {
													enabled: true,
													mode: "xy",
												},
											},
										},
									}}
								/>

								<div className="d-flex justify-content-center mt-4">
									<ButtonGroup>
										{chartDays.map((e) => (
											<Button
												key={e.label}
												variant={
													e.value === days
														? "primary"
														: "outline-primary"
												}
												onClick={() => setDays(e.value)}
												className="mx-3 my-2"
											>
												{e.label}
											</Button>
										))}
									</ButtonGroup>
								</div>
							</>
						)}
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default CoinPage;
