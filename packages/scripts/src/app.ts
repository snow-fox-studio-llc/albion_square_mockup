import commander, { Command } from "commander";

import checkMetaVersion from "./actions/check-meta-version";
import populateADPItems from "./actions/populate-adp-items";
import populateADPLocales from "./actions/populate-adp-locales";
import populateItems from "./actions/populate-items";

export default {
	run: async () => {
		const program: Command = new commander.Command();

		program.version("1.0");

		program
			.command("check-meta-version")
			.description("Check for new ao-bin-dumps commit")
			.action(checkMetaVersion);
		program
			.command("populate-adp-items")
			.description("Populate adp item collection")
			.action(populateADPItems);
		program
			.command("populate-adp-locales")
			.description("Populate adp locale collection")
			.action(populateADPLocales);
		program
			.command("populate-items")
			.description("Populate item collection")
			.action(populateItems);
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
