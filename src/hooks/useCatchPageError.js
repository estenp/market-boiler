import React from "react";
import GraphQLErrorList from "../components/graphql-error-list.js";
import Layout from "../components/Layout";

export default function useCatchMissingData({data, errors}) {
	if (errors) {
		return (
			<Layout>
				<GraphQLErrorList errors={errors} />
			</Layout>
		);
	}

	const page = data.page;

	if (!page) {
		throw new Error("Missing page data. Add data in Sanity to correspond to this page.");
	}

	return page;
}
