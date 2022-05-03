const mongoose = require("mongoose");
const itemSchema = require("../schemas/item.js");

const Item = mongoose.model("Item", itemSchema);

module.exports = {
	async upsert(filter, doc) {
		return await Item.findOneAndUpdate(filter, doc, {
			upsert: true,
		});
	},
	async find(filter, page = 0, limit = 10) {
		return await Item.find(filter)
			.limit(limit)
			.skip(page * limit)
			.lean()
			.exec();
	},
	async findCount(filter) {
		return await Item.countDocuments(filter).exec();
	},
	async findAll() {
		return await Item.find({}).lean().exec();
	},
	async findAllCount() {
		return await Item.estimatedDocumentCount().exec();
	},
	async search(query, filter, page = 0, limit = 10) {
		return await Item.aggregate()
			.search({
				index: "default",
				text: {
					path: ["en"],
					query: query,
					fuzzy: {},
				},
			})
			.match(filter)
			.skip(page * limit)
			.limit(limit)
			.exec();
	},
	async searchCount(query, filter) {
		return (
			await Item.aggregate()
				.search({
					index: "default",
					text: {
						path: ["en"],
						query: query,
						fuzzy: {},
					},
				})
				.match(filter)
				.count("count")
				.exec()
		)[0].count;
	},
	async deleteGhosts(version) {
		return await Item.deleteMany({ version: { $ne: version } });
	},
};
