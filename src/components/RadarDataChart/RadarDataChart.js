import React from "react";
import "./RadarDataChart.module.scss";
import {format} from "d3-format";
import {RadarChart} from "react-vis";

export default class RadarDataChart extends React.Component {
	constructor(props) {
		super(props);
		//this.state = {};
		// console.log(props);
	}

	render() {
		let radarStyle = new Object();
		if (!this.props.detailPage) {
			radarStyle.width = 200;
			radarStyle.height = 200;
			radarStyle.margin = 25;
			radarStyle.styleObj = {
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
			};
		} else {
			radarStyle.width = 400;
			radarStyle.height = 400;
			radarStyle.margin = 50;
			radarStyle.styleObj = {
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
					text: {opacity: 0.2}
				},
				labels: {
					fontSize: 14,
					marginBottom: 10,
					marginTop: 10
				},
				polygons: {
					fillOpacity: 0.1,
					stroke: "rgb(41, 29, 224)",
					fill: "rgb(137, 234, 84)",
					strokeWidth: 2,
					strokeOpacity: 0.3
				}
			};
		}

		const basicFormat = format(".1r");
		const wideFormat = format(".3r");

		var chartDataArray = [
			{
				name: this.props.data.title
			}
		];
		var chartDomainArray = [];

		this.props.data.attributes.effects.forEach(e => {
			console.log(e);
			chartDataArray[0][e.label] = e.level;
			var obj = {
				name: e.label,
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
				tickFormat={t => basicFormat(t)}
				startingAngle={0}
				domains={chartData.domain}
				style={radarStyle.styleObj}
				width={radarStyle.width}
				height={radarStyle.height}
				margin={radarStyle.margin}
				hideInnerMostValues={true}
			/>
		);
	}
}
