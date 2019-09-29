export default {
	name: "order",
	title: "Order",
	type: "document",
	// liveEdit: false,
	// __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
	fields: [
		{
			name: "first",
			title: "First Name",
			type: "string"
		},
		{
			name: "last",
			title: "Last Name",
			type: "string"
		},
		{
			name: "email",
			title: "Email",
			type: "string"
		},
		{
			name: "phone",
			title: "Phone",
			type: "string"
		},

		{
			name: "comments",
			title: "Comments",
			type: "text"
		},

		{
			name: "orderDetails",
			title: "Order Details",
			type: "array",
			of: [{type: "orderDetails"}]
		},
		{
			name: "grandTotal",
			title: "Grand Total",
			type: "number"
		}
	]
};
