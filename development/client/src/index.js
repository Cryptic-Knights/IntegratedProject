import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap.min.css";
import { Apploader } from "./components/Apploader";
// import App from "./App";
const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Suspense fallback={<Apploader />}>
		<App />
	</Suspense>
);
