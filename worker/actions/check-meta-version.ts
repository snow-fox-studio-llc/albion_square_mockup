const axios = require("axios").default;
const fs = require("fs").promises;
const path = require("path");

module.exports = async () => {
	console.log("Getting albion online metadata version");
	const metaLatestCommitHash = (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;

	//TODO
	console.log("Reading local version");
	const currentMetaVersion = JSON.parse(
		await fs.readFile(path.resolve(__dirname, "../app.json"), {
			encoding: "utf-8",
		})
	).version;

	console.log("Comparing versions");
	if (metaLatestCommitHash === currentMetaVersion) {
		console.log("Up to date");
	} else {
		console.log("Out of date");
	}
};
