const { resolve } = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const itemsRouter = require("./routers/items.js");

module.exports.start = async () => {
	const app = express();

	//Middleware
	app.use(express.json());
	app.use(morgan(":method :url :status - :response-time ms"));
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					"img-src": ["'self'", "albionsquare.nyc3.cdn.digitaloceanspaces.com"],
					"script-src": ["'self'", "plausible.io"]
				},
			},
		})
	);
	app.use(compression());

	//Static
	if (process.env.NODE_ENV === "production") {
		app.use(express.static(resolve(__dirname, "../web/dist/")));
	}

	//SPA
	if (process.env.NODE_ENV === "production") {
		app.get("/app/*", (req, res) =>
			res.sendFile(resolve(__dirname, "../web/dist/app/index.html"))
		);
	}

	//Routers
	app.use("/api/items", itemsRouter);

	const port = process.env.PORT || 6969;

	await new Promise((resolve, reject) => {
		app.listen(port, (expressErr) => {
			if (expressErr) {
				reject(expressErr);
			} else {
				console.log(`Listening on port ${port}`);
				resolve();
			}
		});
	});
};
