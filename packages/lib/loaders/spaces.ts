import AWS from "aws-sdk";

export default class SpacesConnection {
	static s3: AWS.S3 = null;
	public s3: AWS.S3;

	constructor() {
		this.s3 = new AWS.S3({
			endpoint: process.env.SPACES_ENDPOINT,
			accessKeyId: process.env.SPACES_KEY,
			secretAccessKey: process.env.SPACES_SECRET,
		});

		SpacesConnection.s3 = this.s3;
	}
}
