import React from 'react'
import Layout from '../components/layout'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <div style={{ padding: `20px` }}>
        <h3 style={{ color: '#000000' }}> {post.frontmatter.title}</h3>
        <h5 style={{ color: '#333333' }}>{post.frontmatter.subtitle}</h5>
        {post.frontmatter.description}
        <div style={{ padding: `30px 0 0 0` }} dangerouslySetInnerHTML={{ __html: post.html }}/>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        description
        order
      }
    }
  }
`