import React from "react";
import GraphQLErrorList from "../components/graphql-error-list.js";
import Layout from "../components/Layout";

export const useCatchPageError = props => {
	//console.log(props);
	const {data, errors} = props;

	if (errors) {
		return (
			<Layout>
				<GraphQLErrorList errors={errors} />
			</Layout>
		);
	}

	const page = data && data.page;

	if (!page) {
		throw new Error("Missing page data. The path queried on this page does not match one in Sanity.");
	}

	return page;
};
