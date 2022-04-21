const mongoose = require("mongoose");

let items = null;

module.exports = {
	init(conn = mongoose.connection) {
		const collection = "adp-items";

		const itemSchema = new mongoose.Schema(
			{
				"@uniquename": {
					type: String,
					unique: true,
					required: true,
				},
			},
			{ collection: collection, strict: false }
		);

		items = conn.model(collection, itemSchema);
	},
	async create(item) {
		return await items.create(item);
	},
	async findAll() {
		return await items.find({}).lean().exec();
	},
};
