import { model } from "mongoose";
import rawLocaleSchema, {
	IRawLocale,
	IRawLocaleLeanDoc,
} from "@as/schemas/raw-locale";
import { IRawItem } from "@as/schemas/raw-item";

const RawLocale = model("RawLocale", rawLocaleSchema);

export default {
	create: async (rawLocaleObj: IRawLocale): Promise<void> => {
		await RawLocale.create(rawLocaleObj);
	},
	findItemLocale: async (uniqueName: string): Promise<IRawLocaleLeanDoc> => {
		return await RawLocale.findOne({ "@tuid": `@ITEMS_${uniqueName}` })
			.lean()
			.exec();
	},
	drop: async (): Promise<void> => {
		await RawLocale.collection.drop();
	},
	init: async (): Promise<void> => {
		await RawLocale.createCollection();
	},
};
