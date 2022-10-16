import axios from "axios";
import adpItems from "@as/models/adp-items";

import iterateArrayOrObj from "../utils/iterate-array-or-obj";

export default async () => {
	console.log("Fetching ao-bin-dumps/items.json");
	const itemsJson: any = (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json",
			{ responseType: "json" }
		)
	).data;

	console.log("Initializing empty adp items collection");
	await adpItems.drop();
	await adpItems.init();

	console.log("Bulding adp-items collection");
	const itemKeys = Object.keys(itemsJson.items);
	for (let i = 3; i < itemKeys.length; ++i) {
		let itemValue = itemsJson.items[itemKeys[i]];
		await iterateArrayOrObj(itemValue, async (item) => {
			console.log(`@uniquename: ${item["@uniquename"]}`);
			await adpItems.create(item);
		});
	}
};
