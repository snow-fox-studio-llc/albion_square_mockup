const axios = require("axios").default;
const adpLocalizationModel = require("../models/adp-localization.js");

module.exports = async () => {
	console.log("Fetching ao-bin-dumps/localization.json");
	const localizationJson = (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/localization.json",
			{ responseType: "json" }
		)
	).data;

	console.log("Building adp-localization collection");
	for (const entry of localizationJson.tmx.body.tu) {
		if ("tuv" in entry && "@tuid" in entry) {
			console.log(`@tuid: ${entry["@tuid"]}`);
			await adpLocalizationModel.create(entry);
		}
	}
};
