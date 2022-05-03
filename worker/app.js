const commander = require("commander");

const adpItemsAction = require("./actions/adp-items.js");
const adpLocalizationAction = require("./actions/adp-localization.js");
const asItemAssetsAction = require("./actions/as-item-assets.js");
const asItemsAction = require("./actions/as-items.js");
const asMarketplaceAction = require("./actions/as-marketplace.js");
const checkMetaVersionAction = require("./actions/check-meta-version.js");
const buildLocalesAction = require("./actions/build-locales.js");
const updateMetaVersionAction = require("./actions/update-meta-version.js");

module.exports.run = async () => {
	const program = new commander.Command();

	program.version("1.0");

	program
		.command("check-meta-version")
		.description("Check for new ao-bin-dumps commit")
		.action(checkMetaVersionAction);
	program
		.command("adp-items")
		.description("Create adp item collection")
		.action(adpItemsAction);
	program
		.command("adp-localization")
		.description("Create adp localization collection")
		.action(adpLocalizationAction);
	program
		.command("as-items")
		.description("Create as item collection")
		.action(asItemsAction);
	program
		.command("as-item-assets")
		.description("Fetch item assets")
		.action(asItemAssetsAction);
	program
		.command("as-marketplace")
		.description("Compile marketplace values and localization")
		.action(asMarketplaceAction);
	program
		.command("build-locales")
		.description("Build i18n locales")
		.action(buildLocalesAction);
	program
		.command("update-meta-version")
		.description("Update local ao-bin-dumps version")
		.action(updateMetaVersionAction);

	await program.parseAsync(process.argv);
};
