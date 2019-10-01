export default {
	name: "orderDetails",
	title: "Order Details",
	type: "object",
	fields: [
		{
			name: "productReference",
			title: "Product",
			type: "productReference"
		},
		{
			name: "quantity",
			title: "Quantity",
			type: "number"
		},
		{
			name: "total",
			title: "Cost",
			type: "number"
		}
	],
	preview: {
		select: {
			title: "productReference.product.name",
			quantity: "quantity",
			unit: "productReference.unit.unitType"
		},
		prepare(selection) {
			const {title, quantity, unit} = selection;
			return {
				title: title,
				subtitle: `${quantity} ${unit}`
			};
		}
	}
};
