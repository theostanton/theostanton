import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import style from './style.module.css'
import Img from 'gatsby-image'

const Job = props => (
  <Link to={props.node.fields.slug}
        style={{ textDecoration: 'none' }}>
    <div className={style.job}>
      <h3 className={style.text}>{props.node.frontmatter.title}</h3>
      <h5 className={style.text}>{props.node.frontmatter.subtitle}</h5>
      <p className={style.description}>{props.node.frontmatter.description}</p>
    </div>
  </Link>
)


const links = {
  'email': 'mailto:theostanton@gmail.com?Subject=Hello%20Theo',
  'linkedin': 'https://www.linkedin.com/in/theostanton',
  'github': 'https://www.github.com/theostanton',
  'instagram': 'https://instagram.com/theostanton',
}


export default ({ data }) => (
  <Layout>
    {console.log(data)}
    <div style={{ paddingBottom: '10px' }}>

      {Object.keys(links).map(name => {
        const node = data.allFile.edges.find(({ node }) => {
          return node.name === name
        }).node
        console.log('node=', node)
        return (
          <a key={node.id} href={links[name]} style={{ padding: '4px' }}>
            <Img fixed={node.childImageSharp.fixed}/>
          </a>)
      })}


    </div>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Job node={node} key={node.id}/>
    ))}
  </Layout>
)

export const query = graphql`
  query {

    allFile(filter: {relativePath: {regex: "/images/"}}) {
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
