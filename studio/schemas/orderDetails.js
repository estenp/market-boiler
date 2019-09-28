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
	]
};
