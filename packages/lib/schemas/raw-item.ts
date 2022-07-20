import mongoose from "mongoose";

export interface IRawItem {
    "@uniquename"?: string
}

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
