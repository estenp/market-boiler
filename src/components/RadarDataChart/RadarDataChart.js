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
			radarStyle.width = 300;
			radarStyle.height = 300;
			radarStyle.margin = 30;
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
		}

		const basicFormat = format(".1r");
		const wideFormat = format(".3r");

		let chartDataArray = [
			this.props.data.effects.reduce((obj, effect) => {
				// console.log("effect", effect);
				obj[effect.labelReference.label] = effect.level;
				return obj;
			}, {})
		];

		// chartDataArray.push({
		// 	name: this.props.data.name
		// });

		let chartDomainArray = this.props.data.effects.reduce((arr, effect) => {
			return [
				...arr,
				{
					name: effect.labelReference.label,
					domain: [0, 10]
				}
			];
		}, []);
		console.log("domain log", chartDomainArray);
		console.dir("data dir", chartDataArray);
		return (
			<RadarChart
				data={chartDataArray}
				tickFormat={t => basicFormat(t)}
				startingAngle={0}
				domains={chartDomainArray}
				style={radarStyle.styleObj}
				width={radarStyle.width}
				height={radarStyle.height}
				margin={radarStyle.margin}
				hideInnerMostValues={true}
			/>
		);
	}
}
