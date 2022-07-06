import mongoose from "mongoose";

const DEFAULT_MONGO_URL: string = "mongodb://localhost:27017/albion_square";

export default async (additionalMongoUrls: string[]) => {
	await mongoose.connect(process.env.MONGO_URL || DEFAULT_MONGO_URL);

	for (const additionalMongoUrl of additionalMongoUrls) {
		await mongoose.connect(additionalMongoUrl);
	}
};
