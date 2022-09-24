import mongoose, { Types } from "mongoose";

export interface IADPItem {
	_id?: Types.ObjectId;
	"@uniquename"?: string;
	[x: string]: any;
}

export default new mongoose.Schema<IADPItem>(
	{
		"@uniquename": {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ strict: false }
);
