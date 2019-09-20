export default {
	name: "productEffect",
	title: "Product Effects",
	type: "document",
	fields: [
		{
			name: "label",
			title: "Display Label",
			type: "string"
		},
		{
			name: "level",
			title: "Effect Strength Level",
			type: "number",
			validation: Rule =>
				Rule.required()
					.min(1)
					.max(10)
		}
	]
};
