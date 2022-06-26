const mongoose = require("mongoose");

let AdpItem = null;

module.exports = {
	init(conn = mongoose.connection) {
		const itemSchema = new mongoose.Schema(
			{
				"@uniquename": {
					type: String,
					unique: true,
					required: true,
				},
			},
			{ strict: false }
		);

		AdpItem = conn.model("AdpItem", itemSchema);
	},
	async create(item) {
		return await AdpItem.create(item);
	},
	async findAll() {
		return await AdpItem.find({}).lean().exec();
	},
};
