import React from "react";

import "./footer.scss";

export default () => {
	return (
		<footer className="footer cm-section-bg">
			<div className="columns is-centered">
				<div className="column is-half">
					<div className="content has-text-centered">
						<h5 className="mb-1">Info</h5>
						<p>
							<strong>Albion Square</strong> by
							<a href="https://snowfox.studio">Snow Fox Studio</a>.
						</p>
					</div>
				</div>
				<div className="column is-half">
					<div className="content has-text-centered">
						<h5 className="mb-1">Legal</h5>
						<p className="mb-0">
							<a href="#">Terms of Use</a>
						</p>
						<p className="mb-0">
							<a href="#">Privacy</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};
