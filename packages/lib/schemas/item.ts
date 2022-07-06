import mongoose from "mongoose";

export interface IItem {
	uniqueName?: string;
	shopCategory?: string;
	shopSubCategory?: string;
	tier?: number;
	enchantment?: number;
	quality?: number;
	hasAsset?: number | null;
	version?: string;
	enchantments?: number[];
	maxQuality?: number;
	en?: string;
	de?: string;
	fr?: string;
	ru?: string;
	pl?: string;
	es?: string;
	pt?: string;
	zh?: string;
	ko?: string;
}

export default new mongoose.Schema<IItem>({
	uniqueName: {
		type: String,
		required: true,
	},
	shopCategory: {
		type: String,
		required: true,
	},
	shopSubCategory: {
		type: String,
		required: true,
	},
	tier: {
		type: Number,
		required: true,
	},
	enchantment: {
		type: Number,
		required: true,
	},
	quality: {
		type: Number,
		required: true,
	},
	hasAsset: {
		type: Boolean,
		default: null,
	},
	version: {
		type: String,
		required: true,
	},
	enchantments: {
		type: [Number],
		required: true,
	},
	maxQuality: {
		type: Number,
		required: true,
	},
	en: {
		type: String,
		required: true,
	},
	de: {
		type: String,
		required: true,
	},
	fr: {
		type: String,
		required: true,
	},
	ru: {
		type: String,
		required: true,
	},
	pl: {
		type: String,
		required: true,
	},
	es: {
		type: String,
		required: true,
	},
	pt: {
		type: String,
		required: true,
	},
	zh: {
		type: String,
		required: true,
	},
	ko: {
		type: String,
		required: true,
	},
});
