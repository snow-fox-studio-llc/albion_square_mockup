import React, { useContext } from "react";

import { NavFabContext } from "../utils/context.js";

import "./nav-fab.scss";

export default () => {
    const [isActive, setIsActive] = useContext(NavFabContext);

	return (
		<div id="nav-fab">
			<button
				className="button is-medium is-info"
				type="button"
				onClick={() => {
					setIsActive(!isActive);
				}}
			>
				<span className="icon">
					<i className="fas fa-bars fa-lg"></i>
				</span>
			</button>
		</div>
	);
};
