export default {
	name: "productEffectDetail",
	type: "object",
	fields: [
		{
			name: "labelReference",
			title: "Label",
			type: "reference",
			weak: true,
			to: [{type: "productEffect"}]
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
	],

	preview: {
		select: {
			title: "labelReference.label"
		}
	}
};
