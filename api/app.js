const express = require("express");
const morgan = require("morgan");
const itemsRouter = require("./routers/items.js");

module.exports.start = async () => {
	const app = express();

	//Middleware
	app.use(express.json());
	app.use(morgan(":method :url :status - :response-time ms"));

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
