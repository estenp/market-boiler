import S from "@sanity/desk-tool/structure-builder";

export default () =>
	S.list()
		.title("Content")
		.items([S.listItem().title("Your first structure!")]);
