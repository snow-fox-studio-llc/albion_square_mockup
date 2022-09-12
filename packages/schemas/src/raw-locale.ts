import mongoose, { HydratedDocument } from "mongoose";

export interface IRawItem {
	"@tuid"?: string;
	tuv?: any;
}

export type IRawItemDoc = HydratedDocument<IRawItem>;

export default new mongoose.Schema<IRawItem>(
	{
		"@tuid": {
			type: String,
			unique: true,
			required: true,
		},
		tuv: {
			type: Object,
			required: true,
		},
	},
	{ strict: false }
);
