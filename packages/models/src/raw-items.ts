import { model } from "mongoose";
import rawItemSchema, { IRawItem } from "@as/schemas/raw-item";

const RawItem = model("RawItem", rawItemSchema);

export default {
	create: async (rawItemObj: IRawItem): Promise<void> => {
		await RawItem.create(rawItemObj);
	},
	getAll: async (): Promise<IRawItem[]> => {
		return await RawItem.find({}).lean().exec();
	},
	drop: async (): Promise<void> => {
		await RawItem.collection.drop();
	},
	init: async (): Promise<void> => {
		await RawItem.createCollection();
	},
};
