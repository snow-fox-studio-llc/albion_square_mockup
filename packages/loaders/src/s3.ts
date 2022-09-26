import { S3 } from "aws-sdk";
import itemAssets from "@as/models/item-assets";

const s3 = new S3({
	endpoint: process.env.SPACES_ENDPOINT,
	accessKeyId: process.env.SPACES_KEY,
	secretAccessKey: process.env.SPACES_SECRET,
});

itemAssets.setS3Instance(s3);
