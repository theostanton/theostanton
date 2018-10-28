module.exports = {
  siteMetadata: {
    title: 'Theo Stanton',
  },
  plugins: [
    `gatsby-plugin-favicon`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Theo Stanton',
        short_name: 'Theo',
        start_url: '/',
        background_color: '#222222',
        theme_color: '#222222',
        display: 'minimal-ui',
      },
    },
    {
      resolve: 'gatsby-plugin-mixpanel',
      options: {
        apiToken: 'd70501c7a5bb7e4a072e488f74157870',
      },
    },
    'gatsby-plugin-offline',
  ],
}
