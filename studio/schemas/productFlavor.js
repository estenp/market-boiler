import SettingsIcon from "react-icons/lib/md/settings-input-component";
export default {
	name: "productFlavor",
	title: "Product Flavors",
	type: "document",
	icon: SettingsIcon,
	fields: [
		{
			name: "label",
			title: "Display Label",
			type: "string"
		}
	]
};
