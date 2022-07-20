import mongoose from "mongoose";

export interface IRawItem {
	"@tuid"?: string;
	tuv?: any;
}

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
