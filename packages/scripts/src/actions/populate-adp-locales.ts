import axios from "axios";
import adpLocales from "@as/models/adp-locales";

export default async () => {
	console.log("Fetching ao-bin-dumps/localization.json");
	const localizationJson = (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/localization.json",
			{ responseType: "json" }
		)
	).data;

	console.log("Initializing empty adp locales collection");
	await adpLocales.drop();
	await adpLocales.init();

	console.log("Building adp-localization collection");
	for (const entry of localizationJson.tmx.body.tu) {
		if ("tuv" in entry && "@tuid" in entry) {
			console.log(`@tuid: ${entry["@tuid"]}`);
			await adpLocales.create(entry);
		}
	}
};
