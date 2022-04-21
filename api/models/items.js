const mongoose = require("mongoose");
const itemSchema = require("../schemas/item.js");

const defaultPage = 0;
const defaultLimit = 10;

const items = mongoose.model("Item", itemSchema, "items");

module.exports = {
	async upsert(condition, update) {
		return await items.findOneAndUpdate(condition, update, {
			upsert: true,
		});
	},
	async find(filter, page = defaultPage, limit = defaultLimit) {
		return await items
			.find(filter)
			.limit(limit)
			.skip(page * limit)
			.lean()
			.exec();
	},
	async findCount(filter) {
		return await items.countDocuments(filter).exec();
	},
	async findAll() {
		return await items.find({}).lean().exec();
	},
	async findAllCount() {
		return await items.estimatedDocumentCount().exec();
	},
	async search(searchString, filter, page = defaultPage, limit = defaultLimit) {
		return await items
			.aggregate()
			.search({
				index: "default",
				text: {
					path: ["en"],
					query: searchString,
					fuzzy: {},
				},
			})
			.match(filter)
			.skip(page * limit)
			.limit(limit)
			.exec();
	},
	async searchCount(searchString, filter) {
		return (
			await items
				.aggregate()
				.search({
					index: "default",
					text: {
						path: ["en"],
						query: searchString,
						fuzzy: {},
					},
				})
				.match(filter)
				.count("count")
				.exec()
		)[0].count;
	},
	async deleteGhosts(adpVersion) {
		return await items.deleteMany({ adpVersion: { $ne: adpVersion } });
	},
};
