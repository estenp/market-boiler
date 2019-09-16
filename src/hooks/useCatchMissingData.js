import React from "react";
import GraphQLErrorList from "../components/graphql-error-list.js";
import Layout from "../components/Layout";

function useCatchMissingData({data, errors}) {
	if (errors) {
		return (
			<Layout>
				<GraphQLErrorList errors={errors} />
			</Layout>
		);
	}

	const page = data.page;

	if (!page) {
		throw new Error(
			'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
		);
	}

	return page;
}
