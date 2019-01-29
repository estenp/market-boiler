import React from "react";
import PropTypes from "prop-types";
import HTMLContent from "../Content.js";
import "./StatusAlert.scss";

const StatusAlert = props => (
	<div className="status-alert">
		<div className="container">
			<div className="level">
				<div className="level-left">
					<div
						className="level-item"
						dangerouslySetInnerHTML={{ __html: props.message }}
					/>
				</div>
			</div>

			{/* TODO */}
			{/* <div className="level-right"><a>Read more...</a></div> */}
		</div>
	</div>
);

StatusAlert.propTypes = {
	message: PropTypes.string
};

export default StatusAlert;
