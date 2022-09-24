import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
	await mongoose.connect(process.env.MONGODB_URL);
};

export const disconnect = async (): Promise<void> => {
	await mongoose.disconnect();
}
