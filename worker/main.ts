const mongoose = require("mongoose");
const AWS = require("aws-sdk");

const adpItemModel = require("./models/adp-item");
const adpLocalizationModel = require("./models/adp-localization");
const asItemAssetModel = require("./models/as-item-asset");

const app = require("./app.js");

const main = async () => {
	console.log("Connecting MongoDB");
	const mongoUrl =
		process.env.MONGO_URL || "mongodb://localhost:27017/albion_square";
	await mongoose.connect(mongoUrl);
	console.log(`Connected to ${mongoUrl}`);

	console.log("Connecting to temporary MongoDB");
	const tempMongoUrl =
		process.env.TEMP_MONGO_URL || "mongodb://localhost:27017/albion_square";
	const tempMongoConn = await mongoose.createConnection(tempMongoUrl);
	console.log(`Connected to ${tempMongoUrl}`);

	console.log("Connecting to s3 bucket");
	const s3 = new AWS.S3({
		endpoint: process.env.SPACES_ENDPOINT,
		accessKeyId: process.env.SPACES_KEY,
		secretAccessKey: process.env.SPACES_SECRET,
	});

	console.log("Initializing models");
	adpItemModel.init(tempMongoConn);
	adpLocalizationModel.init(tempMongoConn);
	asItemAssetModel.init(s3);

	console.log("Running");
	await app.run();

	console.log("Disconnecting from MongoDB");
	await mongoose.disconnect();
};

main();
