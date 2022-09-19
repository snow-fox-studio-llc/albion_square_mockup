import { model, LeanDocument } from "mongoose";
import rawLocaleSchema from "@as/schemas/raw-locale";

const RawLocale = model("RawLocale", rawLocaleSchema);

export default {
	create: async (rawLocaleObj: any): Promise<void> => {
		await RawLocale.create(rawLocaleObj);
	},
	getAll: async (): Promise<LeanDocument<any>[]> => {
		return await RawLocale.find({}).lean().exec();
	},
	drop: async (): Promise<void> => {
		await RawLocale.collection.drop();
	},
	init: async (): Promise<void> => {
		await RawLocale.createCollection();
	},
};
