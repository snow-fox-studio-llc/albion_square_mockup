import axios from "axios";
import rawLocales from "@as/models/raw-locales";

export default async () => {
	console.log("Fetching ao-bin-dumps/localization.json");
	const localizationJson = (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/localization.json",
			{ responseType: "json" }
		)
	).data;

	console.log("Initializing empty raw locales collection");
    await rawLocales.drop();
    await rawLocales.init();

	console.log("Building adp-localization collection");
	for (const entry of localizationJson.tmx.body.tu) {
		if ("tuv" in entry && "@tuid" in entry) {
			console.log(`@tuid: ${entry["@tuid"]}`);
			await rawLocales.create(entry);
		}
	}
};
