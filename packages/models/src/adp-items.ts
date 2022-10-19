import { model, Types, Schema } from "mongoose";

export interface IADPItem {
	_id?: Types.ObjectId;
	"@uniquename"?: string;
	[x: string]: any;
}

const adpItemSchema = new Schema<IADPItem>(
	{
		"@uniquename": {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ strict: false }
);


const ADPItem = model<IADPItem>("ADPItem", adpItemSchema);

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
