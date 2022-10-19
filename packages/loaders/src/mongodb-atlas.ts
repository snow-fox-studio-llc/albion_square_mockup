import mongoose from "mongoose";

export default {
	init: async () => {
		console.log("Connecting to MongoDB");
		await mongoose.connect(process.env.MONGODB_URL);
	},
};
