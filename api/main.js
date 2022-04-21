const mongoose = require("mongoose");
const app = require("./app.js");

const main = async () => {
	console.log("Connecting to default MongoDB");
	await mongoose.connect(
		process.env.MONGO_URL || "mongodb://localhost:27017/albion_square"
	);

	await app.start();
};

main();
