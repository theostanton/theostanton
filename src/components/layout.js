import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import style from '../pages/style.module.css'
import { StaticQuery, graphql, Link } from 'gatsby'

class LayoutComponent extends React.Component {
  render() {
    const { children } = this.props

    return (
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
              <Helmet>
                <title>Theo Stanton</title>
                <meta name="description" content="Theo Stanton"/>
                <meta name="keywords" content="theo,stanton,theo stanton,cto"/>
                <html lang="en"/>
                <script async defer data-domain="theo.dev" src="https://plausible.io/js/plausible.js"/>
              </Helmet>
              <div style={{ padding: `0 20px` }}>
                <h1>
                  <Link
                    style={{ color: '#000000', textDecoration: 'none' }}
                    to={'/'}
                  >
                    {data.site.siteMetadata.title}
                  </Link>
                </h1>
                <hr/>
                {children}
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

LayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutComponent
