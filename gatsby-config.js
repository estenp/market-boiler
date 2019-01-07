var autoprefixer = require('autoprefixer');
var browserslist = require('browserslist');
module.exports = {
    siteMetadata: {
        title: "Market Boiler",
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                postCssPlugins: [
                    autoprefixer({ browsers: browserslist() })
                ],
            },
        },
        // {
        //     resolve: `gatsby-plugin-postcss`,
        //     options: {
        //         postCssPlugins: [
        //             autoprefixer({ browsers: browserslist() })
        //         ],
        //     },
        // },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/pages`,
                name: "pages",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/img`,
                name: "images",
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [],
            },
        },
        {
            resolve: "gatsby-plugin-netlify-cms",
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`,
            },
        },
        "gatsby-plugin-netlify", // make sure to keep it last in the array
    ],
};
