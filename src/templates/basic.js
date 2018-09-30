import React from "react"
import Layout from "../components/layout"

export default ({data}) => {
    const post = data.markdownRemark;

    return (
        <Layout>
            <div>
                <h2>{post.frontmatter.title}</h2>
                <div dangerouslySetInnerHTML={{__html: post.html}}/>
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
      }
    }
  }
`;