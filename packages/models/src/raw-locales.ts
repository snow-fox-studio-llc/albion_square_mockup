import { model } from "mongoose";
import rawLocaleSchema, {
	IRawLocale,
	IRawLocaleLeanDoc,
} from "@as/schemas/raw-locale";

const RawLocale = model("RawLocale", rawLocaleSchema);

export default {
	create: async (rawLocaleObj: IRawLocale): Promise<void> => {
		await RawLocale.create(rawLocaleObj);
	},
	getAll: async (): Promise<IRawLocaleLeanDoc[]> => {
		return await RawLocale.find({}).lean().exec();
	},
	drop: async (): Promise<void> => {
		await RawLocale.collection.drop();
	},
	init: async (): Promise<void> => {
		await RawLocale.createCollection();
	},
};
