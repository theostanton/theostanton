import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'


const Job = props => (
  <div className="job" key={props.node.id}>
    <Link to={props.node.fields.slug}>
      <h3>{props.node.frontmatter.title}{' '} <span>— {props.node.frontmatter.subtitle}</span></h3>
      <p>{props.node.frontmatter.description}</p>
    </Link>
    <br/>
  </div>
)



const Job = props => (
  <div className={styles.user} key={props.node.id}>
    <img src={props.avatar} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)



export default ({ data }) => (
  <Layout>
    <br/>
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