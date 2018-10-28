import React from 'react'
import Layout from '../components/layout'
import style from '../pages/style.module.css'
import PropTypes from 'prop-types'


class JobComponent extends React.Component {

  componentDidMount() {
    const post = this.props.data.markdownRemark
    this.context.mixpanel.identify()
    this.context.mixpanel.track('Job', {
      environment: process.env.NODE_ENV,
      job: post.frontmatter.title,
    })
  }

  render() {
    const post = this.props.data.markdownRemark
    return (
      <Layout>
        <div style={{ padding: `20px` }}>
          <h3 className={style.text}> {post.frontmatter.title}</h3>
          <h5 className={style.text}>{post.frontmatter.subtitle}</h5>
          <p className={style.description}>{post.frontmatter.description}</p>
          <div style={{ padding: `30px 0 0 0` }} dangerouslySetInnerHTML={{ __html: post.html }}/>
        </div>
      </Layout>
    )
  }
}

JobComponent.contextTypes = {
  mixpanel: PropTypes.object.isRequired,
}

export default JobComponent


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
