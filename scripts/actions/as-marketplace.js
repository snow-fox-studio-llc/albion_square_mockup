const axios = require("axios").default;
const fs = require("fs").promises;
const path = require("path");
const langCodesJson = require("../json/lang-codes.json");
const adpLocalizationModel = require("../models/adp-localization.js");
const arrayOrObjHelperUtil = require("../utils/array-or-obj-helper.js");
const extractLocalizedValuesUtil = require("../utils/extract-localized-values.js");

module.exports = async () => {
	console.log("Fetching ao-bin-dumps/items.json");
	const itemsJson = (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json",
			{ responseType: "json" }
		)
	).data;

	const adpMarketplaceLocalization = {
		rollout: {},
		shopCategory: {},
		shopSubCategory: {},
		quality: {},
	};
	const adpMarketplaceValues = {
		shopCategory: [],
		shopSubCategory: {},
		tier: [1, 2, 3, 4, 5, 6, 7, 8],
		enchantment: [0, 1, 2, 3],
		quality: [1, 2, 3, 4, 5],
	};

	console.log("Pulling rollouts localization");

	const localizedRollouts =
		await adpLocalizationModel.findMarketplaceRollouts();

	for (const localizedRollout of localizedRollouts) {
		switch (localizedRollout["@tuid"]) {
			case "@MARKETPLACEGUI_ROLLOUT_DEFAULT_CATEGORY":
				adpMarketplaceLocalization.rollout.category =
					extractLocalizedValuesUtil(localizedRollout.tuv);
				break;
			case "@MARKETPLACEGUI_ROLLOUT_DEFAULT_SUBCATEGORY":
				adpMarketplaceLocalization.rollout.subCategory =
					extractLocalizedValuesUtil(localizedRollout.tuv);
				break;
			case "@MARKETPLACEGUI_ROLLOUT_DEFAULT_TIER":
				adpMarketplaceLocalization.rollout.tier = extractLocalizedValuesUtil(
					localizedRollout.tuv
				);
				break;
			case "@MARKETPLACEGUI_ROLLOUT_DEFAULT_ENCHANTMENTLEVEL":
				adpMarketplaceLocalization.rollout.enchantment =
					extractLocalizedValuesUtil(localizedRollout.tuv);
				break;
			case "@MARKETPLACEGUI_ROLLOUT_DEFAULT_QUALITY":
				adpMarketplaceLocalization.rollout.quality = extractLocalizedValuesUtil(
					localizedRollout.tuv
				);
				break;
		}
	}

	console.log("Pulling shop categories and sub categories with localization");

	const shopCategories = itemsJson.items["shopcategories"]["shopcategory"];

	for (const shopCategory of shopCategories) {
		const shopCategoryId = shopCategory["@id"];

		const localizedShopCategory =
			await adpLocalizationModel.findShopCategoryById(shopCategoryId);

		adpMarketplaceValues.shopCategory.push(shopCategoryId);

		adpMarketplaceLocalization.shopCategory[shopCategoryId] =
			extractLocalizedValuesUtil(localizedShopCategory.tuv);

		adpMarketplaceValues.shopSubCategory[shopCategoryId] = [];

		await arrayOrObjHelperUtil(
			shopCategory.shopsubcategory,
			async (shopSubCategory) => {
				const shopSubCategoryId = shopSubCategory["@id"];

				const localizedShopSubCategory =
					await adpLocalizationModel.findShopSubCategoryById(shopSubCategoryId);

				adpMarketplaceValues.shopSubCategory[shopCategoryId].push(
					shopSubCategoryId
				);

				if (Array.isArray(localizedShopSubCategory.tuv)) {
					adpMarketplaceLocalization.shopSubCategory[shopSubCategoryId] =
						extractLocalizedValuesUtil(localizedShopSubCategory.tuv);
				} else {
					adpMarketplaceLocalization.shopSubCategory[shopSubCategoryId] = {};

					for (const langCode of langCodesJson) {
						adpMarketplaceLocalization.shopSubCategory[shopSubCategoryId][
							langCode
						] = localizedShopSubCategory.tuv.seg;
					}
				}
			}
		);
	}

	console.log("Pulling quality localization");

	for (let quality = 1; quality <= 5; ++quality) {
		const localizedQuality = await adpLocalizationModel.findItemQualityByNumber(
			quality
		);
		adpMarketplaceLocalization.quality[quality] = extractLocalizedValuesUtil(
			localizedQuality.tuv
		);
	}

	console.log("Writing files");
	await fs.writeFile(
		path.resolve(__dirname, "../../locales/adp-marketplace.json"),
		JSON.stringify(adpMarketplaceLocalization)
	);
	await fs.writeFile(
		path.resolve(__dirname, "../../web/src/app/json/marketplace-values.json"),
		JSON.stringify(adpMarketplaceValues)
	);
};
