const langCodeDictionaryJson = require("../json/lang-code-dictionary.json");

module.exports = (tuv) =>
	Object.fromEntries(
		new Map(
			tuv.map((obj) => [langCodeDictionaryJson[obj["@xml:lang"]], obj.seg])
		)
	);
