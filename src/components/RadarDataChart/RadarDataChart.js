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
		const basicFormat = format(".1r");
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
				tickFormat={t => basicFormat(t)}
				startingAngle={0}
				domains={chartData.domain}
				style={this.props.style}
				width={this.props.width}
				height={this.props.height}
				margin={this.props.margin}
				hideInnerMostValues={true}
			/>
		);
	}
}
