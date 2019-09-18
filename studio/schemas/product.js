export default {
	name: "product",
	title: "Product",
	type: "document",
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
      type: "array",
      of: [
        type: "reference",
        weak: true,
        to: [{type: "productType"}]
      ]
    },
    {
      name: "type",
      title: "Product Options",
      type: "array",
      of: [
        {type: "object"}
      ]
    },
    {
      name: "type",
      title: "Product Effects",
      type: "array",
      of: [
        type: "reference",
        weak: true,
        to: [{type: "productEffect"}]
      ]
    },
    {
      name: "type",
      title: "Product Flavors",
      type: "array",
      of: [
        type: "reference",
        weak: true,
        to: [{type: "productFlavor"}]
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
