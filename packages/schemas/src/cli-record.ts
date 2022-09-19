import { Schema, LeanDocument } from "mongoose";

export interface ICLIRecord {
	version?: string;
	created_at?: Date;
}

export type ICLIRecordLeanDoc = LeanDocument<ICLIRecord>;

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
