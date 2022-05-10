import Head from "next/head";
import { Fragment } from "react";
import "../styles/globals.scss";
import "../styles/nav.scss";

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<Fragment>
			<Head>
				<link
					rel="preconnect"
					href="https://albionsquare.nyc3.cdn.digitaloceanspaces.com"
				/>
				<link
					rel="icon"
					type="image/svg+xml"
					href="https://albionsquare.nyc3.cdn.digitaloceanspaces.com/media/albionsquare-logo.svg"
				/>
				<link rel="preconnect" href="https://plausible.io" />
			</Head>
			{getLayout(<Component {...pageProps} />)}
		</Fragment>
	);
}

export default MyApp;
