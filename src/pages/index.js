import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import style from './style.module.css'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const Job = props => (
  <Link to={props.node.frontmatter.path} style={{ textDecoration: 'none' }}>
    <div className={style.job}>
      <h3 className={style.text}>{props.node.frontmatter.title}</h3>
      <h5 className={style.text}>{props.node.frontmatter.subtitle}</h5>
      <p className={style.description}>{props.node.frontmatter.description}</p>
    </div>
  </Link>
)

const links = {
  email: 'mailto:hello@theo.dev?Subject=Hello%20Mr%20Theo',
  linkedin: 'https://linkedin.com/in/theostanton',
  github: 'https://github.com/theostanton',
  instagram: 'https://instagram.com/theostanton',
  strava: 'https://www.strava.com/athletes/4142500',
}

class IndexComponent extends React.Component {

  render() {
    const { data } = this.props
    return (
      <Layout>
        <div style={{ paddingBottom: '10px' }}>
          {Object.keys(links).map(name => {
            const node = data.allFile.edges.find(({ node }) => {
              return node.name === name
            }).node

            return (
              <a
                key={name}
                href={links[name]}
                target="_blank"
                style={{ padding: '6px 4px 4px 4px' }}
              >
                <Img fixed={node.childImageSharp.fixed}/>
              </a>
            )
          })}
        </div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Job node={node} key={node.id}/>
        ))}
      </Layout>
    )
  }
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
            path
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
