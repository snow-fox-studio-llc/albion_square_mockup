import adpItems from "@as/models/adp-items";
import adpLocales from "@as/models/adp-locales";
import items from "@as/models/items";

import iterateArrayOrObj from "../utils/iterate-array-or-obj";
import extractLocalizedValues from "../utils/extract-localized-values";
import { metaVersionStatus } from "./check-meta-version";

export default async () => {
	const metaVersion: string = await metaVersionStatus.getLatestVersion();

	console.log("Building item collection");
	const itemDocs = await adpItems.getAll();

	for (const item of itemDocs) {
		const uniqueName = item["@uniquename"];
		const shopCategory = item["@shopcategory"];
		const shopSubCategory = item["@shopsubcategory1"];
		const tier = Number(item["@tier"]);
		const maxQuality = Number(item["@maxqualitylevel"] || "1");

		const localization = await adpLocales.findItemLocale(uniqueName);

		const enchantments = [];

		if ("enchantments" in item) {
			enchantments.push(0);
			await iterateArrayOrObj(
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
					await items.upsert({
						version: metaVersion,
						uniqueName,
						shopCategory,
						shopSubCategory,
						tier,
						enchantment,
						quality,
						enchantments,
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
