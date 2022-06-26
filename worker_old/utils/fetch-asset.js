const axios = require("axios").default;

module.exports = async (uniqueName, en, enchantment, quality) => {
	await new Promise((resolve) => setTimeout(resolve, 100));
	let aoWikiRes = null;
	try {
		aoWikiRes = await axios.get(
			`https://render.albiononline.com/v1/item/${uniqueName}${
				enchantment > 0 ? `@${enchantment}` : ""
			}.png?quality=${quality > 1 ? quality : ""}&locale=en`,
			{
				responseType: "arraybuffer",
				timeout: 1000,
			}
		);
	} catch (errUniqueName) {
		try {
			aoWikiRes = await axios.get(
				`https://render.albiononline.com/v1/item/${en}${
					enchantment > 0 ? `@${enchantment}` : ""
				}.png?quality=${quality > 1 ? quality : ""}&locale=en`,
				{
					responseType: "arraybuffer",
					timeout: 1000,
				}
			);
		} catch (errLocalizedNames) {
			throw new Error(
				`${errUniqueName.message} | ${errLocalizedNames.message}`
			);
		}
	}

	return aoWikiRes.data;
};
