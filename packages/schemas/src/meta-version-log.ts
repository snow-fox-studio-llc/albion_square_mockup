import { Schema, Types } from "mongoose";

export interface IMetaVersionLog {
	_id?: Types.ObjectId;
	version?: string;
	created_at?: Date;
}

export default new Schema<IMetaVersionLog>(
	{
		version: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);
