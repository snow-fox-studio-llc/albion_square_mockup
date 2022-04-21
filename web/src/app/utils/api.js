export default {
	async searchItems(filters) {
		const queryFilters = Object.entries(filters)
			.map(([key, value]) => `${key}=${value}`)
			.join("&");

		let res = null;
		if(filters.searchString) {
			res = await fetch(
				`/api/items/search${
					Object.keys(filters).length > 0 ? "?" : ""
				}${queryFilters}`
			);
		} else {
			res = await fetch(
				`/api/items/find${
					Object.keys(filters).length > 0 ? "?" : ""
				}${queryFilters}`
			);
		}

		return await res.json();
	},
	async fetchCurrentPrices(uniqueName, enchantment, quality, markets) {
		const res = await fetch(
			`https://www.albion-online-data.com/api/v2/stats/prices/${uniqueName}${
				enchantment === 0 ? "" : `@${enchantment}`
			}.json?locations=${markets.join()}&qualities=${quality}`
		);
		return await res.json();
	},
	async fetchItemChart(uniqueName, enchantment, quality, markets) {
		const res = await fetch(
			`https://www.albion-online-data.com/api/v2/stats/history/${uniqueName}${
				enchantment === 0 ? "" : `@${enchantment}`
			}.json?locations=${markets.join()}&qualities=${quality}&date=2-5-2020&end_date=2-12-2020&time-scale=6`
		);
		return await res.json();
	},
};
