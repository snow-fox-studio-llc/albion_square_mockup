const fs = require("fs").promises;
const path = require("path");
const axios = require("axios").default;

module.exports = async () => {
	console.log("Getting albion online metadata version");
	const metaLatestCommitHash = (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;

	console.log("Writing version");
	await fs.writeFile(
		path.resolve(__dirname, "../app.json"),
		JSON.stringify({ version: metaLatestCommitHash })
	);
};
