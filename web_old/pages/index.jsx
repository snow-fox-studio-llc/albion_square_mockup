import { useState, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import classNames from "classnames";

export default function Home() {
	const [isBurgerActive, setIsBurgerActive] = useState(false);

	return (
		<Fragment>
			<Head>
				<title>Albion Square</title>
				<meta name="description" content="Hassle-Free Albion Assistant" />
			</Head>

			<section className="hero is-info is-halfheight cm-hero">
				<div className="hero-head">
					<nav className="navbar">
						<div className="container">
							<div className="navbar-brand">
								<a className="navbar-item">
									<img
										src="https://albionsquare.nyc3.cdn.digitaloceanspaces.com/media/albionsquare-full-dark.svg"
										alt="Logo"
									/>
								</a>
								<span
									className={classNames({
										"navbar-burger": true,
										"is-active": isBurgerActive,
									})}
									data-target="navbarMenuHeroA"
									onClick={() => setIsBurgerActive(!isBurgerActive)}
								>
									<span></span>
									<span></span>
									<span></span>
								</span>
							</div>
							<div
								id="navbarMenuHeroA"
								className={classNames({
									"navbar-menu": true,
									"is-active": isBurgerActive,
								})}
							>
								<div className="navbar-end has-text-centered">
									<span className="navbar-item">
										<Link href="/marketplace">
											<a className="button is-primary is-rounded is-outlined">
												Open Web App
											</a>
										</Link>
									</span>
								</div>
							</div>
						</div>
					</nav>
				</div>
				<div className="hero-body">
					<div className="container">
						<p className="title has-text-centered is-2">
							Hassle-Free Albion Assistant
						</p>
						<p className="subtitle has-text-centered">
							There is no Need To Make Albion Online a Second Job
						</p>
						<p className="has-text-centered">
							<Link href="/marketplace">
								<a className="button is-primary is-large is-rounded">
									Open Web App
								</a>
							</Link>
						</p>
					</div>
				</div>
			</section>

			<section className="section cm-section-bg cm-section-layout">
				<div className="columns is-centered">
					<div className="column is-one-quarter">
						<figure className="image is-3by2">
							<img src="https://albionsquare.nyc3.cdn.digitaloceanspaces.com/media/mouse.svg" />
						</figure>
					</div>
					<div className="column is-one-quarter has-text-centered is-flex is-flex-direction-column is-justify-content-center">
						<h1 className="title">Spend More Time Playing</h1>
						<h2 className="subtitle">
							Not making spreadsheets. Browse current and historical item
							prices, calculate crafting requirements, track investments and
							more!
							<small>(eventually)</small>.
						</h2>
					</div>
				</div>
			</section>

			<section className="section cm-section-bg cm-section-layout">
				<div className="columns is-centered">
					<div className="column is-one-quarter">
						<figure className="image is-3by2">
							<img src="https://albionsquare.nyc3.cdn.digitaloceanspaces.com/media/ui-design.svg" />
						</figure>
					</div>
					<div className="column is-one-quarter has-text-centered is-flex is-flex-direction-column is-justify-content-center">
						<h1 className="title">
							Responsive
							<small className="has-text-weight-normal">(enough)</small> Design
						</h1>
						<h2 className="subtitle">
							Support for popular modern phone / desktop browsers. No tablets
							though. It's like the middle child.
						</h2>
					</div>
				</div>
			</section>

			<section className="section cm-section-bg cm-section-layout">
				<div className="columns is-centered">
					<div className="column is-one-quarter">
						<figure className="image is-3by2">
							<img src="https://albionsquare.nyc3.cdn.digitaloceanspaces.com/media/web-dev.svg" />
						</figure>
					</div>
					<div className="column is-one-quarter has-text-centered is-flex is-flex-direction-column is-justify-content-center">
						<h1 className="title">Developed with ❤️ and a Laptop</h1>
						<h2 className="subtitle">
							This app is currently in active development. Features mentioned on
							this page may not be fully implemented nor released, but are in
							the the horizon.
						</h2>
					</div>
				</div>
			</section>

			<footer className="footer cm-section-bg">
				<div className="columns is-centered">
					<div className="column is-one-quarter">
						<div className="content has-text-centered">
							<h5 className="mb-1">Info</h5>
							<p>
								<strong>Albion Square</strong> by
								<a href="https://snowfox.studio"> Snow Fox Studio</a>.
							</p>
						</div>
					</div>
					<div className="column is-one-quarter">
						<div className="content has-text-centered">
							<h5 className="mb-1">Credits</h5>
							<p>
								Header svg background by
								<a href="https://www.svgbackgrounds.com">
									{" "}
									SVGBackgrounds.com{" "}
								</a>
								under
								<a href="https://www.svgbackgrounds.com/license/">
									{" "}
									CC BY 4.0{" "}
								</a>
								License.
								<br />
								Illustrations by
								<a href="https://illlustrations.co"> illlustrations.co</a> under
								<a href="https://illlustrations.co/license/"> MIT </a> License.
							</p>
						</div>
					</div>
					<div className="column is-one-quarter">
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
		</Fragment>
	);
}
