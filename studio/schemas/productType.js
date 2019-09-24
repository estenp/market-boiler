import SettingsIcon from "react-icons/lib/md/settings-input-component";
export default {
	name: "productType",
	title: "Product Types",
	type: "document",
	icon: SettingsIcon,
	fields: [
		{
			name: "label",
			title: "Type Label",
			type: "string"
		}
	]
};
