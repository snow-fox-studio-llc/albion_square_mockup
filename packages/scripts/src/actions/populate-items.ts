import adpItems from "@as/models/adp-items";
import adpLocales from "@as/models/adp-locales";
import items from "@as/models/items";

import arrayOrObjHelper from "../lib/array-or-obj-helper";
import extractLocalizedValues from "../lib/extract-localized-values";
import { getMetaVersion } from "./check-meta-version";

export default async () => {
	console.log("Getting albion online metadata version");
	const metaVersion: string = await getMetaVersion();

	console.log("Building item collection");
	const itemDocs = await adpItems.getAll();
	for (const item of itemDocs) {
		const uniqueName = item["@uniquename"];
		const shopCategory = item["@shopcategory"];
		const shopSubCategory = item["@shopsubcategory1"];
		const tier = Number(item["@tier"]);
		const maxQuality = Number(item["@maxqualitylevel"] || "1");

		const localization = await adpLocales.findItemLocale(uniqueName);

		const availableEnchantments = [];

		if ("enchantments" in item) {
			availableEnchantments.push(0);
			await arrayOrObjHelper(
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
					await items.upsert({
						version: metaVersion,
						uniqueName,
						shopCategory,
						shopSubCategory,
						tier,
						enchantment,
						quality,
						enchantments: availableEnchantments,
						maxQuality,
						...extractLocalizedValues(localization.tuv),
					});
				} catch (err: any) {
					console.log(
						`${uniqueName} | ${enchantment} | ${quality} | ${err.message}`
					);
				}

				console.log(`${uniqueName} | ${enchantment} | ${quality} | Done`);
			}
		}
	}

	console.log("Cleaning up ghost items");
	await items.deleteGhosts(metaVersion);
};
