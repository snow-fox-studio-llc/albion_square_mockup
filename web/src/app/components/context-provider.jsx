import React, { createContext, useState } from "react";

import { ModalContext, NavFabContext } from "../utils/context.js";

export default ({ children }) => {
	const [modalState, setModalState] = useState({
		isActive: false,
		component: null,
	});
	const [navFabState, setNavFabState] = useState(false);

	return (
		<ModalContext.Provider value={[modalState, setModalState]}>
			<NavFabContext.Provider value={[navFabState, setNavFabState]}>
				{children}
			</NavFabContext.Provider>
		</ModalContext.Provider>
	);
};
