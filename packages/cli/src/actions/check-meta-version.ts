import axios from "axios";
import cliRecords from "@as/models/cli-records";

export default async () => {
	console.log("Getting albion online metadata version");
	const metaLatestCommitHash = (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;

	console.log(`Metadata commit hash: ${metaLatestCommitHash}`);

	const cliRecord = await cliRecords.findVersion();

	console.log(`Version: ${cliRecord.version}`);

	cliRecords.create(metaLatestCommitHash);
};
