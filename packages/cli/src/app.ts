import commander, { Command } from "commander";
import checkMetaVersion from "./actions/check-meta-version";
import populateRawItems from "./actions/populate-raw-items";
import populateRawLocales from "./actions/populate-raw-locales";

export default {
	run: async () => {
		const program: Command = new commander.Command();

		program.version("1.0");

		program
			.command("check-meta-version")
			.description("Check for new ao-bin-dumps commit")
			.action(checkMetaVersion);
		program
			.command("populate-raw-items")
			.description("Populate raw items collection")
			.action(populateRawItems);
		program
			.command("populate-raw-locales")
			.description("Create adp localization collection")
			.action(populateRawLocales);
		program.command("as-items").description("Create as item collection");
		// .action(asItemsAction);
		program.command("as-item-assets").description("Fetch item assets");
		// .action(asItemAssetsAction);
		program
			.command("as-marketplace")
			.description("Compile marketplace values and localization");
		// .action(asMarketplaceAction);
		program.command("build-locales").description("Build i18n locales");
		// .action(buildLocalesAction);
		program
			.command("update-meta-version")
			.description("Update local ao-bin-dumps version");
		// .action(updateMetaVersionAction);

		await program.parseAsync(process.argv);
	},
};
