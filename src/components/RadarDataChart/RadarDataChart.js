import React from "react";
import "./RadarDataChart.module.scss";
import {format} from "d3-format";
import {RadarChart} from "react-vis";

export default class RadarDataChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const basicFormat = format(".2r");
		const wideFormat = format(".3r");

		const chartData = {
			data: [
				{
					name: "Mercedes",
					mileage: 7,
					price: 10,
					safety: 8,
					performance: 9,
					interior: 7,
					warranty: 7
				}
			],
			domain: [
				{name: "mileage", domain: [0, 10]},
				{
					name: "price",
					domain: [0, 10],
					tickFormat: t => `$${basicFormat(t)}`,
					getValue: d => d.price
				},
				{name: "safety", domain: [0, 10], getValue: d => d.safety},
				{name: "performance", domain: [0, 10], getValue: d => d.performance},
				{name: "interior", domain: [0, 10], getValue: d => d.interior},
				{name: "warranty", domain: [0, 10], getValue: d => d.warranty}
			]
		};
		return (
			<RadarChart
				data={chartData.data}
				tickFormat={t => wideFormat(t)}
				startingAngle={0}
				domains={chartData.domain}
				style={{
					axes: {
						line: {},
						ticks: {},
						text: {display: "none"}
					},
					labels: {
						fontSize: 12
					},
					polygons: {
						strokeWidth: 0.5,
						strokeOpacity: 1,
						fillOpacity: 0.1
					}
				}}
				width={300}
				height={200}
			/>
		);
	}
}
