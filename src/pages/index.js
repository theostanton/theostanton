import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import style from './style.module.css'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const Job = props => (
  <Link to={props.node.fields.slug} style={{ textDecoration: 'none' }}>
    <div className={style.job}>
      <h3 className={style.text}>{props.node.frontmatter.title}</h3>
      <h5 className={style.text}>{props.node.frontmatter.subtitle}</h5>
      <p className={style.description}>{props.node.frontmatter.description}</p>
    </div>
  </Link>
)

const links = {
  email: 'mailto:theostanton@gmail.com?Subject=Hello%20Theo',
  linkedin: 'https://linkedin.com/in/theostanton',
  github: 'https://github.com/theostanton',
  instagram: 'https://instagram.com/theostanton',
}

class IndexComponent extends React.Component {
  componentDidMount() {
    this.context.mixpanel.identify()
    this.context.mixpanel.track('Home', {
      environment: process.env.NODE_ENV,
    })
  }

  render() {
    const { data } = this.props
    const mixpanel = this.context.mixpanel
    return (
      <Layout>
        <div style={{ paddingBottom: '10px' }}>
          {Object.keys(links).map(name => {
            const node = data.allFile.edges.find(({ node }) => {
              return node.name === name
            }).node

            function onClick() {
              mixpanel.track('Link', {
                environment: process.env.NODE_ENV,
                job: name,
              })
            }

            return (
              <a
                key={name}
                href={links[name]}
                onClick={onClick}
                style={{ padding: '4px' }}
              >
                <Img fixed={node.childImageSharp.fixed} />
              </a>
            )
          })}
        </div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Job node={node} key={node.id} />
        ))}
      </Layout>
    )
  }
}

IndexComponent.contextTypes = {
  mixpanel: PropTypes.object.isRequired,
}

export default IndexComponent

export const query = graphql`
  query {
    allFile(filter: { relativePath: { regex: "/images/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fixed(width: 24, height: 24) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }

    allMarkdownRemark(sort: { fields: [frontmatter___order], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            subtitle
            description
            order
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
