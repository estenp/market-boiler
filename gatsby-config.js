module.exports = {
	siteMetadata: {
		title: "Market Boiler"
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		// {
		// 	resolve: `gatsby-plugin-postcss`,
		// 	options: {
		// 		postCssPlugins: [
		// 			require(`postcss-preset-env`)({
		// 				stage: 2
		// 			})
		// 		]
		// 	}
		// },
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
				name: `data`,
				path: `${__dirname}/src/data/`,
				ignore: [`**/\.*`] // ignore files starting with a dot
			}
		},
		{
			resolve: "gatsby-plugin-page-transitions",
			options: {
				transitionTime: 500
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
		{
			resolve: "gatsby-plugin-netlify-cms",
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`
			}
		},
		"gatsby-plugin-netlify" // make sure to keep it last in the array
	]
};
