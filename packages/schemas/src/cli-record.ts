import { Schema, LeanDocument } from "mongoose";

export interface ICLIRecord {
	version?: string;
}

export type ICLIRecordLeanDoc = LeanDocument<ICLIRecord>;

export default new Schema<ICLIRecord>(
	{
		version: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
