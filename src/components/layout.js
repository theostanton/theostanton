import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import containerStyles from './layout.module.css'
import { StaticQuery, graphql, Link } from 'gatsby'

const Layout = ({ children }) => (
  <div className={containerStyles.layout}>
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en"/>
          </Helmet>
          <div>
            <h1><Link style={{ color: '#000000', padding: `0 20px` }} to={'/'}>{data.site.siteMetadata.title}</Link>
            </h1>
            <hr/>
            {children}
          </div>
        </>
      )}
    />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
