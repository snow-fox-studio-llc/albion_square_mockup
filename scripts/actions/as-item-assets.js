const itemsModel = require("../../api/models/items.js");
const asItemAssetsModel = require("../models/as-item-assets.js");
const fetchAssetUtil = require("../utils/fetch-asset.js");

module.exports = async () => {
	console.log("Listing item assets");
	const itemAssets = await asItemAssetsModel.getList();

	console.log("Running");
	const itemDocs = await itemsModel.findAll();
	for (const { uniqueName, enchantment, quality, en } of itemDocs) {
		const assetInBucket = itemAssets[
			`items/${uniqueName}/${enchantment}/${quality}/asset.webp`
		]
			? true
			: false;

		if (assetInBucket) {
			console.log(
				`${uniqueName} | ${enchantment} | ${quality} | Already in bucket`
			);
			await itemsModel.upsert(
				{ uniqueName, enchantment, quality },
				{ hasAssetAvailable: true }
			);
			continue;
		}

		let assetBuffer = null;

		try {
			assetBuffer = await fetchAssetUtil(uniqueName, en, enchantment, quality);
		} catch (err) {
			console.log(
				`${uniqueName} | ${enchantment} | ${quality} | ${err.message}`
			);
			await itemsModel.upsert(
				{ uniqueName, enchantment, quality },
				{ hasAssetAvailable: false }
			);
			continue;
		}

		await asItemAssetsModel.putObject(
			uniqueName,
			enchantment,
			quality,
			assetBuffer
		);

		await itemsModel.upsert(
			{ uniqueName, enchantment, quality },
			{ hasAssetAvailable: true }
		);

		console.log(
			`${uniqueName} | ${enchantment} | ${quality} | Uploaded to bucket`
		);
	}
};
