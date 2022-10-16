import items from "@as/models/items";
import itemAssets from "@as/models/item-assets";

import fetchAsset from "../utils/fetch-asset";

export default async () => {
	console.log("Listing item assets");
	const allItemAssets: any = await itemAssets.getList();

	console.log("Running");
	const allItemDocs = await items.findAll();
	for (const { uniqueName, tier, enchantment, quality, en } of allItemDocs) {
		const assetInBucket = allItemAssets[
			`items/${uniqueName}/${enchantment}/${quality}/asset.webp`
		]
			? true
			: false;

		if (assetInBucket) {
			console.log(
				`${uniqueName} | ${enchantment} | ${quality} | Already in bucket`
			);
			await items.upsert({
				uniqueName,
				enchantment,
				quality,
				tier,
				hasAsset: true,
			});
			continue;
		}

		let assetBuffer = null;

		try {
			assetBuffer = await fetchAsset(uniqueName, en, enchantment, quality);
		} catch (err: any) {
			console.log(
				`${uniqueName} | ${enchantment} | ${quality} | ${err.message}`
			);
			await items.upsert({
				uniqueName,
				tier,
				enchantment,
				quality,
				hasAsset: false,
			});
			continue;
		}

		await itemAssets.putObject(uniqueName, enchantment, quality, assetBuffer);

		await items.upsert({
			uniqueName,
			tier,
			enchantment,
			quality,
			hasAsset: true,
		});

		console.log(
			`${uniqueName} | ${enchantment} | ${quality} | Uploaded to bucket`
		);
	}
};
