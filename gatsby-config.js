require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});
const {
	api: {projectId, dataset}
} = requireConfig("./studio/sanity.json");

function requireConfig(path) {
	try {
		return require("./studio/sanity.json");
	} catch (e) {
		console.error("Failed to require sanity.json. Fill in projectId and dataset name manually in gatsby-config.js");
		return {
			api: {
				projectId: process.env.SANITY_PROJECT_ID || "",
				dataset: process.env.SANITY_DATASET || ""
			}
		};
	}
}

module.exports = {
	siteMetadata: {
		title: "Market Boiler"
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-postcss",
		{
			resolve: `gatsby-plugin-react-css-modules`,
			options: {
				// *.css files are included by default.
				// To support another syntax (e.g. SCSS),
				// add `postcss-scss` to your project's devDependencies
				// and add the following option here:
				filetypes: {
					".scss": {syntax: `postcss-scss`}
				},

				// Exclude global styles from the plugin using a RegExp:
				exclude: `\/global-styles\/`
				// For all the options check babel-plugin-react-css-modules README link provided above
			}
		},
		"gatsby-plugin-sass",

		`gatsby-transformer-json`,
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/pages`,
				name: "pages"
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/img`,
				name: "images"
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `products`,
				path: `${__dirname}/src/data/products`,
				ignore: [`**/\.*`] // ignore files starting with a dot
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `flavors`,
				path: `${__dirname}/src/data/flavors`,
				ignore: [`**/\.*`] // ignore files starting with a dot
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `effects`,
				path: `${__dirname}/src/data/effects`,
				ignore: [`**/\.*`] // ignore files starting with a dot
			}
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: []
			}
		},
		// {
		// 	resolve: "gatsby-plugin-netlify-cms",
		// 	options: {
		// 		modulePath: `${__dirname}/src/cms/cms.js`
		// 	}
		// },
		{
			resolve: `gatsby-plugin-create-client-paths`,
			options: {prefixes: [`/products/*`]}
		},
		{
			resolve: "gatsby-source-sanity",
			options: {
				projectId,
				dataset,
				// To enable preview of drafts, copy .env-example into .env,
				// and add a token with read permissions
				token: process.env.SANITY_TOKEN,
				watchMode: true,
				overlayDrafts: true
			}
		},
		"gatsby-plugin-netlify" // make sure to keep it last in the array
	]
};
