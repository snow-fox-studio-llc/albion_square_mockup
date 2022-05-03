import { useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";

export default () => {
	const [serverTime, setServerTime] = useState("00:00");
	const [isActive, setIsActive] = useState(false);

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
		<nav id="nav" className={classNames({ "cm-is-hidden": isActive })}>
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
							<Link href="/marketplace">
								<a
									className={classNames({ "is-active": true })}
									onClick={() => setIsActive(!isActive)}
								>
									Marketplace
								</a>
							</Link>
						</li>
					</ul>
				</aside>
			</div>
		</nav>
	);
};
