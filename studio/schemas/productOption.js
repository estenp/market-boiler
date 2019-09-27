export default {
	name: "productOption",
	title: "Product Option",
	type: "object",
	fields: [
		/* {
			name: "product",
			title: "Product",
			type: "reference",
			to: [{type: "product"}]
		}, */
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
	] /* ,
	preview: {
		select: {
			title: "unitType",
			subtitle: "unitPrice"
		},
		prepare(selection) {
			const {title, subtitle} = selection;
			return {
				title: title,
				product: subtitle
			};
		}
	} */
};
