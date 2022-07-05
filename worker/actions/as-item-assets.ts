const itemModel = require("../../lib/models/item.js");

const asItemAssetModel = require("../models/as-item-asset.js");
const fetchAssetUtil = require("../utils/fetch-asset.js");

module.exports = async () => {
	console.log("Listing item assets");
	const itemAssets = await asItemAssetModel.getList();

	console.log("Running");
	const itemDocs = await itemModel.findAll();
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
			await itemModel.upsert(
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
			await itemModel.upsert(
				{ uniqueName, enchantment, quality },
				{ hasAssetAvailable: false }
			);
			continue;
		}

		await asItemAssetModel.putObject(
			uniqueName,
			enchantment,
			quality,
			assetBuffer
		);

		await itemModel.upsert(
			{ uniqueName, enchantment, quality },
			{ hasAssetAvailable: true }
		);

		console.log(
			`${uniqueName} | ${enchantment} | ${quality} | Uploaded to bucket`
		);
	}
};
