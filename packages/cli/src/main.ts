#!/usr/bin/env node
import mongoose from "mongoose";
import { S3 } from "aws-sdk";
import app from "./app";

const main = async () => {
	console.log("Connecting to MongoDB");
	await mongoose.connect(process.env.MONGODB_URL);

	console.log("Initializing Digital Ocean Space");
	const s3 = new S3({
		endpoint: process.env.SPACES_ENDPOINT,
		accessKeyId: process.env.SPACES_KEY,
		secretAccessKey: process.env.SPACES_SECRET,
	});

    console.log("Running");
	await app.run();

    console.log("Disconnecting from MongoDB");
	await mongoose.disconnect();
};

main();
