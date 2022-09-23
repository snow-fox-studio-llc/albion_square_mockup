import { Schema, Types } from "mongoose";

export interface ICLIRecord {
	_id?: Types.ObjectId;
	version?: string;
	created_at?: Date;
}

export default new Schema<ICLIRecord>(
	{
		version: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);
