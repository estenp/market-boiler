export default {
	name: "productOption",
	title: "Product Option",
	type: "object",
	fields: [
		{name: "unitType", title: "Unit Type", type: "string"},
		{
			name: "unitPrice",
			title: "Unit Price",
			type: "number",
			validation: rule =>
				rule
					.required()
					.precision(2)
					.positive()
		}
	]
};
