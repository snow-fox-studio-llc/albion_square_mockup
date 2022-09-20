import mongoose, { LeanDocument } from "mongoose";

export interface IRawLocale {
	"@tuid"?: string;
	tuv?: any;
	[x: string]: any;
}
export type IRawLocaleLeanDoc = LeanDocument<IRawLocale>;

export default new mongoose.Schema<IRawLocale>(
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
