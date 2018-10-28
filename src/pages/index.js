import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import style from './style.module.css'

const Job = props => (
  <Link to={props.node.fields.slug}
        style={{ textDecoration: 'none' }}
        activeStyle={{
          color: 'red',
        }}>
    <div className={style.job}>
      <h3 className={style.text}>{props.node.frontmatter.title}</h3>
      <h5 className={style.text}>{props.node.frontmatter.subtitle}</h5>
      <p>{props.node.frontmatter.description}</p>
    </div>
  </Link>
)


export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Job node={node} key={node.id}/>
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
