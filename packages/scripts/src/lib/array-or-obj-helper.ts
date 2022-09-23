export default async (i: any, cb: (x: any) => Promise<any>) => {
	if (Array.isArray(i)) {
		for (const k of i) {
			await cb(k);
		}
	} else {
		await cb(i);
	}
};
