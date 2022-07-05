const sharp = require("sharp");

let s3 = null;

module.exports = {
	init(s3Instance) {
		s3 = s3Instance;
	},
	async getList() {
		let marker = null;
		const s3ItemAssets = {};
		do {
			const params = {
				Bucket: process.env.SPACES_BUCKET,
				Prefix: "items/",
			};
			if (marker !== null) params.Marker = marker;
			const res = await s3.listObjects(params).promise();
			Object.assign(
				s3ItemAssets,
				Object.fromEntries(res.Contents.map(({ Key }) => [Key, true]))
			);
			marker = res.NextMarker;
			console.log(`Assets found: ${Object.keys(s3ItemAssets).length}`);
		} while (marker !== undefined);

		return s3ItemAssets;
	},
	async putObject(uniqueName, enchantment, quality, assetBuffer) {
		return await s3
			.putObject({
				Bucket: process.env.SPACES_BUCKET,
				Key: `items/${uniqueName}/${enchantment}/${quality}/asset.webp`,
				Body: await sharp(assetBuffer).webp().toBuffer(),
				ACL: "public-read",
				ContentType: "image/webp",
				CacheControl: "public, max-age=15552000",
			})
			.promise();
	},
};
