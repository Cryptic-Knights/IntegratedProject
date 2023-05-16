import React, { useState, useEffect, Suspense } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import QrCode from "qrcode.react";
import { getUserinfo } from "../config/getUser";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Apploader } from "../components/Apploader";
import { send } from "../config/transaction";
import { TransactionTable } from "./transactionTable";
import { getTransactions } from "../config/getTransactions";

const holdingData = [];

const TradePage = () => {
	const [currency, setCurrency] = useState("usd");
	const [selectedCrypto, setSelectedCrypto] = useState(holdingData[0]);
	const [tradeAmount, setTradeAmount] = useState("");
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [recipientwallet, setrecipientwallet] = useState("");

	const [walletId, setWalletId] = useState("");
	const [qrUrl, setQrUrl] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [showTable, setShowTable] = useState(false);
	const [transactions, setTransactions] = useState("");
	const [errors, setErrors] = useState("");

	const location = useLocation();
	useEffect(() => {
		// Fetch user data
		getUserinfo()
			.then((data) => {
				console.log(data);
				const defaultWalletObj = data.defaultWalletObj;
				setWalletId(defaultWalletObj.walletAddress);
				setQrUrl(
					`http://localhost:3000/trade/?recipientwallet=` +
						defaultWalletObj.walletAddress
				);
				holdingData.push({
					id: defaultWalletObj.walletType,
					name: defaultWalletObj.walletType,
					holdings: defaultWalletObj.walletHoldings,
					costPrice: 54789.23,
				});
				setSelectedCrypto(holdingData[0]);
				setLoaded(true);
			})
			.catch((error) => {
				console.error(error);
				throw new Error("Cant connect to server");
			});

		getTransactions().then((data) => {
			setTransactions(data)
		}).catch((err) => console.log(err));
		const recipientWallet = new URLSearchParams(location.search).get("recipientwallet") || "";

		setrecipientwallet(recipientWallet);
	}, []);

	const handleCryptoChange = (event) => {
		const crypto = holdingData.find((item) => item.id === event.target.value);
		setSelectedCrypto(crypto);
	};

	const handleTradeAmountChange = (event) => {
		setTradeAmount(event.target.value);
	};

	const handlerecipientwalletChange = (event) => {
		setrecipientwallet(event.target.value);
	};

	const handleTradeSubmit = () => {
		setShowConfirmationModal(true);
	};

	const handleConfirmTrade = () => {
		// make API call to send cryptocurrency to the user with the given recipientwallet
		// update user's holdingData and balance accordingly
		// show success message
		setShowConfirmationModal(false);
		send(walletId, recipientwallet, tradeAmount)
			.then((data) => {
				getTransactions().then((data) => {
					setTransactions(data)
				}).catch((err) => console.log(err));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleToggleTable = () => {
		setShowTable(!showTable);
	};

	const handleCloseModal = () => {
		setShowConfirmationModal(false);
	};

	const userBalance = 150000; // assume the user's current balance
	return loaded ? (
		<ErrorBoundary fallback={<p>Error Fetching details</p>}>
			<Suspense fallback={<Apploader />}>
				<Container className="p-4">
					<h1 className="text-center mb-4">Trade</h1>
					<Row>
						<Col md={6}>
							<h3>Send Crypto</h3>
							<Form>
								<Form.Group controlId="formCrypto">
									<Form.Label className="mt-3">
										Select Cryptocurrency
									</Form.Label>
									<Form.Control
										as="select"
										onChange={handleCryptoChange}
										className="mb-2"
									>
										{holdingData.map((item) => (
											<option
												key={item.id}
												value={item.id}
											>
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

								<Form.Group controlId="formrecipientwallet">
									<Form.Label>Recipient ID</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter user ID"
										value={recipientwallet}
										onChange={handlerecipientwalletChange}
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
						<Col
							md={6}
							style={{ textAlign: "right" }}
						>
							<h3>Receive Crypto</h3>
							<p className="mt-2">
								Please scan the following to recieve cryptocurrency:
							</p>
							<div className="d-flex align-items-center justify-content-end mb-3">
								<QrCode
									value={qrUrl}
									size={150}
								/>
							</div>
							<div className="text-muted">
								Alternatively, you can use the wallet Id: {walletId}
							</div>
						</Col>
					</Row>
					<Button
						variant="primary"
						className="mt-4"
						onClick={handleToggleTable}
					>
						{showTable ? "Hide Transactions" : "Show Transactions"}
					</Button>

					{showTable && (
						<div className="mt-4">
							<TransactionTable transactions={transactions} />
						</div>
					)}
					<Modal
						show={showConfirmationModal}
						onHide={handleCloseModal}
					>
						<Modal.Header closeButton>
							<Modal.Title>Confirm Trade</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Are you sure you want to send {tradeAmount}{" "}
							{selectedCrypto.name} to user {recipientwallet}?
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={handleCloseModal}
							>
								Close
							</Button>
							<Button
								variant="primary"
								onClick={handleConfirmTrade}
							>
								Confirm
							</Button>
						</Modal.Footer>
					</Modal>
				</Container>
			</Suspense>
		</ErrorBoundary>
	) : (
		<ErrorBoundary fallback={<p>Error Fetching details</p>}>
			<Apploader />
		</ErrorBoundary>
	);
};

export default TradePage;