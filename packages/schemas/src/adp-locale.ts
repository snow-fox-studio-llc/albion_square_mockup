import mongoose, { Types } from "mongoose";

export interface IADPLocale {
	_id?: Types.ObjectId;
	"@tuid"?: string;
	tuv?: any;
	[x: string]: any;
}

export default new mongoose.Schema<IADPLocale>(
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
