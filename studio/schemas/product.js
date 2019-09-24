import MallIcon from "react-icons/lib/md/local-mall";

export default {
	name: "product",
	title: "Product",
	type: "document",
	icon: MallIcon,
	// liveEdit: false,
	// __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
	fields: [
		{
			name: "name",
			title: "Product Name",
			type: "string"
		},
		{
			name: "type",
			title: "Product Type",
			type: "reference",
			weak: true,
			to: {type: "productType"}
		},
		{
			name: "strain",
			title: "Product Strain",
			type: "reference",
			weak: true,
			to: {type: "productStrain"}
		},
		{
			name: "options",
			title: "Product Options",
			type: "array",
			of: [{type: "productOption"}]
		},
		{
			name: "effects",
			title: "Product Effects",
			type: "array",
			of: [{type: "productEffectDetail"}]
		},
		{
			name: "flavors",
			title: "Product Flavors",
			type: "array",
			of: [
				{
					type: "reference",
					weak: true,
					to: [{type: "productFlavor"}]
				}
			]
		},
		// TODO: create and use a custom image scheme that includes field for alt text
		{
			name: "image",
			title: "Product Image",
			type: "image"
		},
		{
			name: "description",
			title: "Description",
			type: "text"
		}
	]
};
