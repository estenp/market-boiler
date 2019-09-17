export default {
	name: "page",
	title: "Page",
	type: "document",
	// liveEdit: false,
	// __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
	fields: [
		{
			name: "templateKey",
			title: "Template Key",
			type: "string",
			hidden: true
		},
		{
			name: "title",
			title: "Title",
			type: "string"
		},
		{
			name: "body",
			title: "Body",
			type: "blockContent"
		}
	]
};
