import axios from "axios";
import metaVersionLogs from "@as/models/meta-version-logs";

export interface MetaVersionStatus {
	upToDate: boolean;
	updateHash?: string;
}

export const getMetaVersion = async (): Promise<string> => {
	return (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;
};

export const getMetaVersionStatus = async (): Promise<MetaVersionStatus> => {
	console.log("Getting albion online metadata version");
	const metaLatestCommitHash = await getMetaVersion();

	console.log(`Metadata commit hash: ${metaLatestCommitHash}`);

	const cliRecord = await metaVersionLogs.getLatestVersion();

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
