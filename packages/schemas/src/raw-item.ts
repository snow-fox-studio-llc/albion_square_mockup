import mongoose, { HydratedDocument } from "mongoose";

export interface IRawItem {
    "@uniquename"?: string
}

export type IRawItemDoc = HydratedDocument<IRawItem>;

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
