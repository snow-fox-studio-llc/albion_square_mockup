import AWS from "aws-sdk";

export default {
	s3: null,
	connect() {
		this.s3 = new AWS.S3({
			endpoint: process.env.SPACES_ENDPOINT,
			accessKeyId: process.env.SPACES_KEY,
			secretAccessKey: process.env.SPACES_SECRET,
		});
	}
}
