import React from "react";
import "./RadarDataChart.module.scss";
import {format} from "d3-format";
import {RadarChart} from "react-vis";

export default class RadarDataChart extends React.Component {
	constructor(props) {
		super(props);
		//this.state = {};
		console.log(props);
	}

	render() {
		const basicFormat = format(".2r");
		const wideFormat = format(".3r");

		var chartDataArray = [
			{
				name: this.props.data.title
			}
		];
		var chartDomainArray = [];

		this.props.data.attributes.effects.forEach(e => {
			chartDataArray[0][e.effect] = e.level;
			var obj = {
				name: e.effect,
				domain: [0, 10]
			};
			chartDomainArray.push(obj);
		});

		const chartData = {
			data: chartDataArray,
			domain: chartDomainArray
		};

		//console.log(chartData);
		return (
			<RadarChart
				data={chartData.data}
				tickFormat={t => wideFormat(t)}
				startingAngle={0}
				domains={chartData.domain}
				style={{
					axes: {
						line: {
							strokeWidth: 0.5,
							strokeOpacity: 0.5,
							fillOpacity: 0.1,
							stroke: "#ddd",
							strokeWidth: 2,
							strokeOpacity: 0.4
						},
						ticks: {color: "blue"},
						text: {display: "none"}
					},
					labels: {
						fontSize: 14
					},
					polygons: {
						fillOpacity: 0.1,
						stroke: "rgb(41, 29, 224)",
						fill: "rgb(137, 234, 84)",
						strokeWidth: 2,
						strokeOpacity: 0.3
					}
				}}
				width={200}
				height={200}
				margin={20}
				hideInnerMostValues={true}
			/>
		);
	}
}
