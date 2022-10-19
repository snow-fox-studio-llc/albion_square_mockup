import { S3 } from "aws-sdk";
import sharp from "sharp";
import { IItem } from "#internal/items";

class ItemAssetsModel {
	private s3: S3;

	setS3Instance(s3: S3) {
		this.s3 = s3;
	}

	async putObject(
		uniqueName: IItem["uniqueName"],
		enchantment: IItem["enchantment"],
		quality: IItem["quality"],
		assetBuffer: Buffer
	) {
		return await this.s3
			.putObject({
				Bucket: process.env.SPACES_BUCKET,
				Key: `items/${uniqueName}/${enchantment}/${quality}/asset.webp`,
				Body: await sharp(assetBuffer).webp().toBuffer(),
				ACL: "public-read",
				ContentType: "image/webp",
				CacheControl: "public, max-age=15552000",
			})
			.promise();
	}

	async getList() {
		let marker = null;
		const s3ItemAssets = {};
		do {
			const params: { Bucket: string; Prefix: string; Marker?: any } = {
				Bucket: process.env.SPACES_BUCKET,
				Prefix: "items/",
			};
			if (marker !== null) params.Marker = marker;
			const res = await this.s3.listObjects(params).promise();
			Object.assign(
				s3ItemAssets,
				Object.fromEntries(res.Contents.map(({ Key }) => [Key, true]))
			);
			marker = res.NextMarker;
			console.log(`Assets found: ${Object.keys(s3ItemAssets).length}`);
		} while (marker !== undefined);

		return s3ItemAssets;
	}
}

export default new ItemAssetsModel();
