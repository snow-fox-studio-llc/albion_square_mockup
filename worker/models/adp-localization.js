const mongoose = require("mongoose");

let AdpLocalization = null;

module.exports = {
	init(conn = mongoose.connection) {
		const adpLocalizationSchema = new mongoose.Schema({
			"@tuid": {
				type: String,
				unique: true,
				required: true,
			},
			tuv: {
				type: Object,
				required: true,
			},
		});

		AdpLocalization = conn.model("AdpLocalization", adpLocalizationSchema);
	},
	async create(entry) {
		return await AdpLocalization.create(entry);
	},
	async findItemByUniqueName(UniqueName) {
		return await AdpLocalization.findOne({ "@tuid": `@ITEMS_${UniqueName}` })
			.lean()
			.exec();
	},
	async findShopCategoryById(id) {
		return await AdpLocalization.findOne({
			"@tuid": `@MARKETPLACEGUI_ROLLOUT_SHOPCATEGORY_${id.toUpperCase()}`,
		})
			.lean()
			.exec();
	},
	async findShopSubCategoryById(id) {
		return await AdpLocalization.findOne({
			"@tuid": `@MARKETPLACEGUI_ROLLOUT_SHOPSUBCATEGORY_${id.toUpperCase()}`,
		})
			.lean()
			.exec();
	},
	async findItemQualityByNumber(quality) {
		return await AdpLocalization.findOne({
			"@tuid": `@ITEMDETAILS_STATS_QUALITY_${quality}`,
		})
			.lean()
			.exec();
	},
	async findMarketplaceRollouts() {
		return await AdpLocalization.find({
			"@tuid": { $regex: /@MARKETPLACEGUI_ROLLOUT_DEFAULT/gm },
		})
			.lean()
			.exec();
	},
};
