import ProductReferenceObjectInput from "../components/productReferenceObjectInput";
export default {
	name: "productReference",
	title: "Product reference",
	type: "object",
	inputComponent: ProductReferenceObjectInput,
	fields: [
		{
			name: "product",
			title: "Product",
			type: "reference",
			to: [{type: "product"}]
		},
		{
			name: "unit",
			title: "Unit",
			type: "productOption"
		}
	]
};
