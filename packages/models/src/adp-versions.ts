import { model, Schema, Types } from "mongoose";

export interface IADPVersion {
	_id?: Types.ObjectId;
	adpVersion?: string;
	created_at?: Date;
}

const adpVersionSchema = new Schema<IADPVersion>(
	{
		adpVersion: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);


const CLIRecord = model<IADPVersion>("ADPVersion", adpVersionSchema);

export default {
	create: async (adpVersion: IADPVersion["adpVersion"]): Promise<void> => {
		await CLIRecord.create({ adpVersion });
	},
	getLatestVersion: async (): Promise<IADPVersion> => {
		return await CLIRecord.findOne().sort({ created_at: -1 }).lean().exec();
	},
};
