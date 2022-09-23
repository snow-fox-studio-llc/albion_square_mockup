import mongoose, { Types } from "mongoose";

export interface IRawItem {
	_id?: Types.ObjectId;
	"@uniquename"?: string;
	[x: string]: any;
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
