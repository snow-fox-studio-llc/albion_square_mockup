import mongoose, { LeanDocument } from "mongoose";

export interface IRawItem {
	"@uniquename"?: string;
	[x: string]: any;
}

export type IRawItemLeanDoc = LeanDocument<IRawItem>;

export default new mongoose.Schema<IRawItem>(
	{
		"@uniquename": {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ strict: false }
);
