import mongoose from "mongoose";

export default new mongoose.Schema<any>(
	{
		"@uniquename": {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ strict: false }
);
