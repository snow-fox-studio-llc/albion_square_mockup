import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ContextProvider from "./components/context-provider.jsx";

import Advert from "./segments/advert.jsx";
import Footer from "./segments/footer.jsx";
import Main from "./segments/main.jsx";
import Modal from "./segments/modal.jsx";
import Nav from "./segments/nav.jsx";
import NavFab from "./segments/nav-fab.jsx";

import Marketplace from "./views/marketplace.jsx";

import "./loaders/i18n.js";
import "./loaders/chart.js";
import "./loaders/time-ago.js";

const App = () => {
	return (
		<Suspense fallback="loading">
			<BrowserRouter basename="/app">
				<ContextProvider>
					<Nav />
					<Advert />
					<Main>
						<Routes>
							<Route path="/" element={<Marketplace />}></Route>
							<Route path="*" element={<Navigate to="/" replace />}></Route>
						</Routes>
					</Main>
					<Footer />
					<Modal />
					<NavFab />
				</ContextProvider>
			</BrowserRouter>
		</Suspense>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
