import { model, Schema, Types } from "mongoose";

export interface IMetaVersionLog {
	_id?: Types.ObjectId;
	version?: string;
	created_at?: Date;
}

const cliRecrodSchema = new Schema<IMetaVersionLog>(
	{
		version: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);


const CLIRecord = model<IMetaVersionLog>("CLIRecord", cliRecrodSchema);

export default {
	create: async (version: IMetaVersionLog["version"]): Promise<void> => {
		await CLIRecord.create({ version });
	},
	getLatestVersion: async (): Promise<IMetaVersionLog> => {
		return await CLIRecord.findOne().sort({ created_at: -1 }).lean().exec();
	},
};
