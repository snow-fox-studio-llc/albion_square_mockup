import mongooseLoader, { disconnect as mongooseDisconnect } from "@albionsquare/lib/loaders/mongoose";

const main = async () => {
	await mongooseLoader();

    console.log("Connected");

	await mongooseDisconnect();
};

main();
