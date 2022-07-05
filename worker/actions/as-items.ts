const axios = require("axios");

const itemModel = require("../../lib/models/item.js");

const adpItemModel = require("../models/adp-item.js");
const adpLocalizationModel = require("../models/adp-localization.js");
const arrayOrObjHelperUtil = require("../utils/array-or-obj-helper.js");
const extractLocalizedValuesUtil = require("../utils/extract-localized-values.js");

module.exports = async () => {
	console.log("Getting albion online metadata version");
	const version = (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;

	console.log("Building item collection");
	const itemDocs = await adpItemModel.findAll();
	for (const item of itemDocs) {
		const uniqueName = item["@uniquename"];
		const shopCategory = item["@shopcategory"];
		const shopSubCategory = item["@shopsubcategory1"];
		const tier = Number(item["@tier"]);
		const maxQuality = Number(item["@maxqualitylevel"] || "1");

		const localization = await adpLocalizationModel.findItemByUniqueName(
			uniqueName
		);

		const enchantments = [];

		if ("enchantments" in item) {
			enchantments.push(0);
			await arrayOrObjHelperUtil(
				item.enchantments.enchantment,
				async (enchantment) => {
					enchantments.push(Number(enchantment["@enchantmentlevel"]));
				}
			);
		} else if ("@enchantmentlevel" in item) {
			enchantments.push(Number(item["@enchantmentlevel"]));
		} else {
			enchantments.push(0);
		}

		for (const enchantment of enchantments) {
			for (let quality = 1; quality <= maxQuality; ++quality) {
				try {
					await itemModel.upsert(
						{ uniqueName, tier, enchantment, quality },
						{
							version,
							uniqueName,
							shopCategory,
							shopSubCategory,
							tier,
							enchantment,
							quality,
							enchantments,
							maxQuality,
							...extractLocalizedValuesUtil(localization.tuv),
						}
					);
				} catch (err) {
					console.log(
						`${uniqueName} | ${enchantment} | ${quality} | ${err.message}`
					);
				}

				console.log(`${uniqueName} | ${enchantment} | ${quality} | Done`);
			}
		}
	}

	console.log("Cleaning up ghost items");
	await itemModel.deleteGhosts(version);
};
