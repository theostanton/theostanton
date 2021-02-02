import React from "react"
import styled from "styled-components"

export type Props = {
  title: string
  url: string
}

const Container = styled.a`
  font-size: 4vw;
  text-decoration: none;
  color: #000000bb;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #000000dd;
    color: beige;
  }
`

export default class SocialComponent extends React.Component<Props> {

  render() {
    return <Container href={this.props.url}>{this.props.title}</Container>
  }
}
