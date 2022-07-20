import SpacesConnection from "../loaders/spaces";

export const getList = async (prefix: string) => {
	let marker = null;
	const s3ItemAssets = {};
	do {
		const params:any = {
            Bucket: process.env.SPACES_BUCKET,
            Prefix: "items/",
        };
		if (marker !== null) params.Marker = marker;
		const res = await SpacesConnection.s3.listObjects(params).promise();
		Object.assign(
			s3ItemAssets,
			Object.fromEntries(res.Contents.map(({ Key }) => [Key, true]))
		);
		marker = res.NextMarker;
		console.log(`Assets found: ${Object.keys(s3ItemAssets).length}`);
	} while (marker !== undefined);

	return s3ItemAssets;
};
