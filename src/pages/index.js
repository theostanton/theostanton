import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'
import styles from './index.modules.css'
import Layout from '../components/layout'

console.log(styles)

const Job = props => (
  <div className={styles.job} key={props.node.id}>
    <Link
      to={props.node.fields.slug}
      className={css`
                text-decoration: none;
                color: inherit;
              `
      }
    >
      <h3>
        {props.node.frontmatter.title}{' '}
        <span
          className={css`
                  color: #bbb;
                `}
        >
                — {props.node.frontmatter.subtitle}
              </span>
      </h3>
      <p>{props.node.frontmatter.description}</p>
    </Link>
  </div>
)


export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Job node={node}/>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark{
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            subtitle
            description
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