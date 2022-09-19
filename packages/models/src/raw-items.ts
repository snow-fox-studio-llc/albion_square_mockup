import { model, LeanDocument } from "mongoose";
import rawItemSchema from "@as/schemas/raw-item";

const RawItem = model("RawItem", rawItemSchema);

export default {
	create: async (rawItemObj: any): Promise<void> => {
		await RawItem.create(rawItemObj);
	},
	getAll: async (): Promise<LeanDocument<any>[]> => {
		return await RawItem.find({}).lean().exec();
	},
	drop: async (): Promise<void> => {
		await RawItem.collection.drop();
	},
	init: async (): Promise<void> => {
		await RawItem.createCollection();
	},
};
