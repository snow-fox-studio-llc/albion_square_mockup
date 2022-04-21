import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { NavFabContext } from "../utils/context.js";

import "./nav.scss";

export default () => {
	const [serverTime, setServerTime] = useState("00:00");
	const [isActive, setIsActive] = useContext(NavFabContext);

	useEffect(() => {
		const interval = setInterval(() => {
			const date = new Date();
			const hours =
				date.getUTCHours().toString().length === 2
					? date.getUTCHours().toString()
					: `0${date.getUTCHours().toString()}`;
			const minutes =
				date.getUTCMinutes().toString().length === 2
					? date.getUTCMinutes().toString()
					: `0${date.getUTCMinutes().toString()}`;
			setServerTime(`${hours}:${minutes}`);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<nav id="nav" className={isActive ? "" : "cm-is-hidden"}>
			<div className="block">
				<figure className="image is-2by1"></figure>
			</div>
			<div className="block">
				<h1 className="title is-5">Server Time</h1>
				<h2 className="subtitle is-6">{`${serverTime} UTC`}</h2>
			</div>
			<div className="block">
				<aside className="menu">
					<p className="menu-label">General</p>
					<ul className="menu-list">
						<li>
							<NavLink
								to="/"
								className={(isActive) => (isActive ? "is-active" : null)}
								onClick={() => setIsActive(!isActive)}
							>
								Marketplace
							</NavLink>
						</li>
					</ul>
				</aside>
			</div>
		</nav>
	);
};
