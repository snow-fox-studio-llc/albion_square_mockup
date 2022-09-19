import { model } from "mongoose";
import cliRecrodSchema, {
	ICLIRecord,
	ICLIRecordLeanDoc,
} from "@as/schemas/cli-record";

const CLIRecord = model<ICLIRecord>("CLIRecord", cliRecrodSchema);

export default {
	create: async (version: ICLIRecord["version"]): Promise<void> => {
		await CLIRecord.create({ version });
	},
	findVersion: async (): Promise<ICLIRecordLeanDoc> => {
		return await CLIRecord.findOne().sort({ created_at: -1 }).lean().exec();
	},
};
