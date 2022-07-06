import mongoose from "mongoose";

export default async (extraMongoUrls: string[]) => {
	await mongoose.connect(
		process.env.MONGO_URL || "mongodb://localhost:27017/albion_square"
	);

	for (const extraMongoUrl of extraMongoUrls) {
		await mongoose.connect(extraMongoUrl);
	}
};
