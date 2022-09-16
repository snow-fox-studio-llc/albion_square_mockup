import axios from "axios";

export default async () => {
	console.log("Getting albion online metadata version");
	const metaLatestCommitHash = (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;

	console.log(`Metadata commit hash: ${metaLatestCommitHash}`);
};
