import mongoose from "mongoose";

export default {
	async connect() {
		await mongoose.connect(
			process.env.MONGO_URL || "mongodb://localhost:27017/albion_square"
		);

		if (process.env.MONGO_URL_ALT) {
			await mongoose.createConnection(process.env.MONGO_URL_ALT).asPromise();
		}
	},
	async disconnect() {
		await mongoose.disconnect();
	},
};
