import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import style from './index.module.css'


const Job = props => (
  <Link to={props.node.fields.slug}>
    <div className={style.job} key={props.node.id}>
      <h3>{props.node.frontmatter.title}</h3>
      <h5>{props.node.frontmatter.subtitle}</h5>
      {props.node.frontmatter.description}
    </div>
  </Link>
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