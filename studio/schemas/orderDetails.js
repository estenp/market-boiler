export default {
	name: "orderDetails",
	title: "Order Details",
	type: "object",
	fields: [
		{
			name: "product",
			title: "Product",
			type: "reference",
			to: [{type: "product"}]
		},
		{
			name: "quantity",
			title: "Quantity",
			type: "number"
		},
		{
			name: "unit",
			title: "Unit",
			type: "reference",
			to: [{type: "productOption"}]
		},
		{
			name: "total",
			title: "Cost",
			type: "number"
		}
	]
};
