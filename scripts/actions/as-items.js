const axios = require("axios");
const itemsModel = require("../../api/models/items.js");
const adpItemsModel = require("../models/adp-items.js");
const adpLocalizationModel = require("../models/adp-localization.js");
const arrayOrObjHelperUtil = require("../utils/array-or-obj-helper.js");
const extractLocalizedValuesUtil = require("../utils/extract-localized-values.js");

module.exports = async () => {
	console.log("Getting albion online metadata version");
	const adpVersion = (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;

	console.log("Building item collection");
	const itemDocs = await adpItemsModel.findAll();
	for (const item of itemDocs) {
		const uniqueName = item["@uniquename"];
		const shopCategory = item["@shopcategory"];
		const shopSubCategory = item["@shopsubcategory1"];
		const tier = Number(item["@tier"]);
		const maxQuality = Number(item["@maxqualitylevel"] || "1");

		const localization = await adpLocalizationModel.findItemByUniqueName(
			uniqueName
		);

		const availableEnchantments = [];

		if ("enchantments" in item) {
			availableEnchantments.push(0);
			await arrayOrObjHelperUtil(
				item.enchantments.enchantment,
				async (enchantment) => {
					availableEnchantments.push(Number(enchantment["@enchantmentlevel"]));
				}
			);
		} else if ("@enchantmentlevel" in item) {
			availableEnchantments.push(Number(item["@enchantmentlevel"]));
		} else {
			availableEnchantments.push(0);
		}

		for (const enchantment of availableEnchantments) {
			for (let quality = 1; quality <= maxQuality; ++quality) {
				try {
					await itemsModel.upsert(
						{ uniqueName, tier, enchantment, quality },
						{
							adpVersion,
							uniqueName,
							shopCategory,
							shopSubCategory,
							tier,
							enchantment,
							quality,
							availableEnchantments,
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
	await itemsModel.deleteGhosts(adpVersion);
};
