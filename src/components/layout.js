import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import style from '../pages/style.module.css'
import { StaticQuery, graphql, Link } from 'gatsby'

const Layout = ({ children }) => (
  <div className={style.layout}>
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
        <div>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Theo Stanton' },
            ]}
          >
            <html lang="en"/>
          </Helmet>
          <div style={{ padding: `0 20px` }}>

            <h1><Link
              style={{ color: '#000000', textDecoration: 'none' }}
              to={'/'}>{data.site.siteMetadata.title}
            </Link></h1>
            <hr/>
            {children}
          </div>
        </div>
      )}/>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
