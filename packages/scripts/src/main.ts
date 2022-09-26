#!/usr/bin/env node
import mongoose from "mongoose";
import s3 from "@as/loaders/s3";
import app from "./app";

const main = async () => {
	console.log("Connecting to MongoDB");
	await mongoose.connect(process.env.MONGODB_URL);

	console.log("Initializing Digital Ocean Space");
	s3.init();

	console.log("Running");
	await app.run();

	console.log("Disconnecting from MongoDB");
	await mongoose.disconnect();
};

main();
