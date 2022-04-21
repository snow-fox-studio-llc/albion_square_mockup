const mongoose = require("mongoose");
const AWS = require("aws-sdk");
const app = require("./app.js");
const adpItemsModel = require("./models/adp-items.js");
const adpLocalizationModel = require("./models/adp-localization.js");
const asItemAssetsModel = require("./models/as-item-assets.js");

const main = async () => {
	console.log("Connecting to default MongoDB");
	await mongoose.connect(
		process.env.MONGO_URL || "mongodb://localhost:27017/albion_square"
	);

	console.log("Connecting to temporary MongoDB");
	const tempMongoConn = await mongoose.createConnection(
		process.env.TEMP_MONGO_URL || "mongodb://localhost:27017/albion_square"
	);

	console.log("Connecting to s3 bucket");
	const s3 = new AWS.S3({
		endpoint: process.env.SPACES_ENDPOINT,
		accessKeyId: process.env.SPACES_KEY,
		secretAccessKey: process.env.SPACES_SECRET,
	});

	console.log("Initializing models");
	adpItemsModel.init(tempMongoConn);
	adpLocalizationModel.init(tempMongoConn);
	asItemAssetsModel.init(s3);

	console.log("Running");
	await app.run();

	console.log("Disconnecting from MongoDB");
	await mongoose.disconnect();
};

main();
