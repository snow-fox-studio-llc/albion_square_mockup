import { model } from "mongoose";
import adpItemSchema, { IADPItem } from "@as/schemas/adp-item";

const ADPItem = model("ADPItem", adpItemSchema);

export default {
	create: async (adpItem: IADPItem): Promise<void> => {
		await ADPItem.create(adpItem);
	},
	getAll: async (): Promise<IADPItem[]> => {
		return await ADPItem.find({}).lean().exec();
	},
	drop: async (): Promise<void> => {
		await ADPItem.collection.drop();
	},
	init: async (): Promise<void> => {
		await ADPItem.createCollection();
	},
};
