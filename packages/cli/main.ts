import mongooseLoader from "@albionsquare/lib/loaders/mongoose";
import spacesLoader from "@albionsquare/lib/loaders/spaces";

const main = async () => {
	await mongooseLoader.connect();
	spacesLoader.connect();

    console.log("Connected");

	await mongooseLoader.disconnect();
};

main();
