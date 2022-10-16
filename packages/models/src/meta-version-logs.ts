import { model } from "mongoose";
import cliRecrodSchema, { IMetaVersionLog } from "@as/schemas/meta-version-log";

const CLIRecord = model<IMetaVersionLog>("CLIRecord", cliRecrodSchema);

export default {
	create: async (version: IMetaVersionLog["version"]): Promise<void> => {
		await CLIRecord.create({ version });
	},
	getLatestVersion: async (): Promise<IMetaVersionLog> => {
		return await CLIRecord.findOne().sort({ created_at: -1 }).lean().exec();
	},
};
