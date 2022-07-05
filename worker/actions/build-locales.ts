const fs = require("fs").promises;
const path = require("path");

const langCodesJson = require("../json/lang-codes.json");

const formatSrcLocale = (srcLocale) => {
	if (Object.keys(srcLocale).every((key) => langCodesJson.includes(key))) {
		return srcLocale;
	} else {
		const locales = Object.fromEntries(
			langCodesJson.map((langCode) => [langCode, {}])
		);

		for (const key of Object.keys(srcLocale)) {
			const formattedSrcLocale = formatSrcLocale(srcLocale[key]);

			for (const langCode of langCodesJson) {
				locales[langCode][key] = formattedSrcLocale[langCode];
			}
		}

		return locales;
	}
};

module.exports = async () => {
	console.log("Listing files");
	const files = await fs.readdir(path.resolve(__dirname, "../../locales/"));

	console.log("Building Locales");
	for (const file of files) {
		const fileObj = path.parse(file);

		const srcLocale = JSON.parse(
			await fs.readFile(path.resolve(__dirname, `../../locales/${file}`), {
				encoding: "utf8",
			})
		);

		const locales = formatSrcLocale(srcLocale);

		for (const langCode of langCodesJson) {
			await fs.writeFile(
				path.resolve(
					__dirname,
					`../../web/public/locales/${langCode}/${fileObj.name}.json`
				),
				JSON.stringify(locales[langCode])
			);
		}
	}
};
