import axios from "axios";
import cliRecords from "@as/models/cli-records";

export interface MetaVersionStatus {
	upToDate: boolean;
	updateHash?: string;
}

export const getMetaVersionStatus = async (): Promise<MetaVersionStatus> => {
	console.log("Getting albion online metadata version");
	const metaLatestCommitHash = (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;

	console.log(`Metadata commit hash: ${metaLatestCommitHash}`);

	const cliRecord = await cliRecords.getLatestVersion();

	console.log(`CLI Record: ${JSON.stringify({ version: cliRecord.version })}`);

	const upToDate = metaLatestCommitHash === cliRecord.version;

	if (upToDate) {
		return { upToDate };
	} else {
		return { upToDate, updateHash: metaLatestCommitHash };
	}
};

export default async (): Promise<void> => {
	await getMetaVersionStatus();
};
