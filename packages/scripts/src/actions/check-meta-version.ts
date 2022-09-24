import axios from "axios";
import metaVersionLogs from "@as/models/meta-version-logs";

export interface MetaVersionStatus {
	upToDate: boolean;
	getLatestVersion?: () => Promise<string>;
}

const fetchADPHash = async (): Promise<string> => {
	return (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;
};

export const metaVersionStatus: MetaVersionStatus = {
	upToDate: false,
	getLatestVersion: fetchADPHash
}

export default async (): Promise<void> => {
	console.log("Fetching latest ADP meta commit hash");
	const latestADPCommitHash = await fetchADPHash();

	console.log(`Latest ADP commit hash: ${latestADPCommitHash}`);

	console.log("Getting latest meta version log");
	const latestMetaVersionLog = await metaVersionLogs.getLatestVersion();

	const upToDate = latestADPCommitHash === latestMetaVersionLog.version;

	if (upToDate) {
		console.log("Meta is up to date");
		metaVersionStatus.upToDate = true;
		metaVersionStatus.getLatestVersion = () => null;
	} else {
		console.log("Meta is out of date");
	}
};
