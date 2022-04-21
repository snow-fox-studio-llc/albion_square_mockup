const express = require("express");
const { query, matchedData, validationResult } = require("express-validator");
const itemsService = require("../services/items.js");

const router = express.Router();

router.get(
	"/find",
	query(["shopCategory", "shopSubCategory"]).optional().isString(),
	query(["tier", "enchantment", "quality"]).optional().isInt().toInt(),
	query("page").optional().isInt({ min: 0 }).toInt(),
	query("limit").optional().isInt({ min: 5, max: 25 }).toInt(),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() });
			} else {
				res
					.set("Cache-Control", "public, max-age=3600")
					.json(
						await itemsService.find(matchedData(req, { locations: ["query"] }))
					);
			}
		} catch (err) {
			next(err);
		}
	}
);

router.get(
	"/search",
	query(["searchString"]).isString().isLength({ min: 1 }),
	query(["shopCategory", "shopSubCategory"]).optional().isString(),
	query(["tier", "enchantment", "quality"]).optional().isInt().toInt(),
	query("page").optional().isInt({ min: 0 }).toInt(),
	query("limit").optional().isInt({ min: 5, max: 25 }).toInt(),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() });
			} else {
				res
					.set("Cache-Control", "public, max-age=3600")
					.json(
						await itemsService.search(
							matchedData(req, { locations: ["query"] })
						)
					);
			}
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
