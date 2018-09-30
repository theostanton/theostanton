import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'


const Job = props => (
  <div key={props.node.id}>
    <Link to={props.node.fields.slug}>
      <h3>{props.node.frontmatter.title}{' '} <span>— {props.node.frontmatter.subtitle}</span></h3>
      <p>{props.node.frontmatter.description}</p>
    </Link>
    <br/>
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
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: DESC }){
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