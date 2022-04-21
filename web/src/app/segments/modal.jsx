import React, { useContext } from "react";

import { ModalContext } from "../utils/context.js";

import "./modal.scss";

export default () => {
	const [state, setState] = useContext(ModalContext);

	const closeModal = () => setState({ isActive: false, component: null });

	return (
		<div id="modal" className={`modal ${state.isActive ? "is-active" : ""}`}>
			<div className="modal-background" onClick={closeModal}></div>
			<div className="modal-content">{state.component}</div>
			<button
				className="modal-close is-large"
				aria-label="close"
				type="button"
				onClick={closeModal}
			></button>
		</div>
	);
};
