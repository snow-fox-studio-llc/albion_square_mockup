import { model } from "mongoose";
import adpLocaleSchema, { IADPLocale } from "@as/schemas/adp-locale";

const ADPLocale = model("ADPLocale", adpLocaleSchema);

export default {
	create: async (adpLocale: IADPLocale): Promise<void> => {
		await ADPLocale.create(adpLocale);
	},
	findItemLocale: async (uniqueName: string): Promise<IADPLocale> => {
		return await ADPLocale.findOne({ "@tuid": `@ITEMS_${uniqueName}` })
			.lean()
			.exec();
	},
	drop: async (): Promise<void> => {
		await ADPLocale.collection.drop();
	},
	init: async (): Promise<void> => {
		await ADPLocale.createCollection();
	},
};
