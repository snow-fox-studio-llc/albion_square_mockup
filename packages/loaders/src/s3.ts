import { S3 } from "aws-sdk";
import itemAssets from "@as/models/item-assets";

class S3Loader {
	private s3: S3;

	init() {
		this.s3 = new S3({
			endpoint: process.env.SPACES_ENDPOINT,
			accessKeyId: process.env.SPACES_KEY,
			secretAccessKey: process.env.SPACES_SECRET,
		});

		itemAssets.setS3Instance(this.s3);
	}
}

export default new S3Loader();
