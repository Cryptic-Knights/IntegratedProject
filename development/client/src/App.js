import Header from "./components/Header";
import FAQPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import SearchPage from "./pages/SearchPage";
import CoinPage from "./pages/CoinPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TradePage from "./pages/TradePage";

import React, { Suspense } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Apploader } from "./components/Apploader";

function App() {
	return (
		<Router>
			<Header />

			<Routes>
				<Route
					path="/"
					Component={HomePage}
				/>
				<Route
					path="/login"
					Component={LoginPage}
				/>
				<Route
					path="/register"
					element={<LoginPage register />}
				/>
				<Route
					path="/search"
					Component={SearchPage}
				/>
				<Route
					path="/portfolio"
					Component={PortfolioPage}
				/>
				<Route
					path="/faq"
					Component={FAQPage}
				/>
				<Route
					path="/trade"
					element={
						<ErrorBoundary fallback={<p>Error Fetching details</p>}>
							<Suspense fallback={<Apploader />}><TradePage/></Suspense>
						</ErrorBoundary>
					}
				/>
				<Route
					path="/coin/:id"
					Component={CoinPage}
				/>
			</Routes>
		</Router>
	);
}

export default App;
