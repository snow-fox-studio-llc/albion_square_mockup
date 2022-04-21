const mongoose = require("mongoose");

let localization = null;

module.exports = {
	init(conn = mongoose.connection) {
		const collection = "adp-localization";

		const localizationSchema = new mongoose.Schema(
			{
				"@tuid": {
					type: String,
					unique: true,
					required: true,
				},
				tuv: {
					type: Object,
					required: true,
				},
			},
			{ collection: collection }
		);

		localization = conn.model(collection, localizationSchema);
	},
	async create(entry) {
		return await localization.create(entry);
	},
	async findItemByUniqueName(UniqueName) {
		return await localization
			.findOne({ "@tuid": `@ITEMS_${UniqueName}` })
			.lean()
			.exec();
	},
	async findShopCategoryById(id) {
		return await localization
			.findOne({
				"@tuid": `@MARKETPLACEGUI_ROLLOUT_SHOPCATEGORY_${id.toUpperCase()}`,
			})
			.lean()
			.exec();
	},
	async findShopSubCategoryById(id) {
		return await localization
			.findOne({
				"@tuid": `@MARKETPLACEGUI_ROLLOUT_SHOPSUBCATEGORY_${id.toUpperCase()}`,
			})
			.lean()
			.exec();
	},
	async findItemQualityByNumber(quality) {
		return await localization
			.findOne({
				"@tuid": `@ITEMDETAILS_STATS_QUALITY_${quality}`,
			})
			.lean()
			.exec();
	},
	async findMarketplaceRollouts() {
		return await localization
			.find({
				"@tuid": { $regex: /@MARKETPLACEGUI_ROLLOUT_DEFAULT/gm },
			})
			.lean()
			.exec();
	},
};
