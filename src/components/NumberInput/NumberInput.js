import React, {useState, useEffect} from "react";
import "./NumberInput.module.scss";

const NumberInput = props => {
	let quantity = props.quantity ? props.quantity : 1;
	const [currentQuant, setCurrentQuant] = useState(quantity);

	return (
		<div styleName="number-input-container">
			<button className="button" styleName="input-change-button" id="decrement" onClick={() => setCurrentQuant(currentQuant > 1 ? currentQuant - 1 : 0)}>
				{/* <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
						  <line x1="0" y1="80" x2="100" y2="80" stroke="black" />
                    </svg> */}
				-
			</button>
			<input
				type="text"
				className="input"
				styleName="number-input"
				value={currentQuant}
				// readOnly={true}
				onChange={props.handleChange.bind(this, props.productID)}
			/>
			<button className="button" styleName="input-change-button" id="increment" onClick={() => setCurrentQuant(currentQuant + 1)}>
				+
			</button>
		</div>
	);
};

export default NumberInput;
