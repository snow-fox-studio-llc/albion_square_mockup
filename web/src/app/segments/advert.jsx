import React from "react";

import "./advert.scss";

export default () => {
	return (
		<header id="advert">
			<article className="message is-info">
				<div className="message-header">
					<p>Support The Project</p>
				</div>
				<div className="message-body">
					<a href="https://www.buymeacoffee.com/snowfoxstudio" target="_blank">
						<img
							src="https://albionsquare.nyc3.cdn.digitaloceanspaces.com/media/bmc-button.svg"
							alt="Buy Me A Coffee"
						/>
					</a>
					<a
						href="https://www.digitalocean.com/?refcode=1cc0f532eef2&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"
						target="_blank"
					>
						<img
							src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg"
							alt="DigitalOcean Referral Badge"
						/>
					</a>
				</div>
			</article>
		</header>
	);
};
