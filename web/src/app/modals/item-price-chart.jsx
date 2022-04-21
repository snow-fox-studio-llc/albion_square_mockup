import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Chart } from "react-chartjs-2";

import api from "../utils/api.js";

export default ({ item, city }) => {
	const { t } = useTranslation();

	const [chartData, setChartData] = useState(null);

	useEffect(async () => {
		const historicalPrices = await api.fetchItemChart(
			item.uniqueName,
			item.enchantment,
			item.quality,
			[city]
		);

		if (historicalPrices.length > 0) {
			setChartData({
				labels: historicalPrices[0].data.map(
					(dataPoint) => dataPoint.timestamp
				),
				datasets: [
					{
						type: "line",
						label: "Price",
						borderColor: "rgb(255, 99, 132)",
						borderWidth: 2,
						fill: false,
						data: historicalPrices[0].data.map(
							(dataPoint) => dataPoint["avg_price"]
						),
					},
					{
						type: "bar",
						label: "Count",
						backgroundColor: "rgb(75, 192, 192)",
						data: historicalPrices[0].data.map(
							(dataPoint) => dataPoint["item_count"]
						),
					},
				],
			});
		}
	}, []);

	return (
		<div className="box">
			<div className="block">
				<article className="media">
					<figure className="media-left">
						<p className="image is-96x96">
							<img
								src={`https://albionsquare.nyc3.digitaloceanspaces.com/items/${item.uniqueName}/${item.enchantment}/${item.quality}/asset.webp`}
							/>
						</p>
					</figure>
					<div className="media-content">
						<h1 className="title is-4">{item.en}</h1>
						<h2 className="subtitle is-5">{`T${item.tier}${
							item.enchantment > 0 ? `.${item.enchantment}` : ""
						} ${t(`adp-marketplace:quality.${item.quality}`)}`}</h2>
					</div>
				</article>
			</div>
			<div className="block">
				{chartData === null ? null : <Chart data={chartData} />}
			</div>
		</div>
	);
};
