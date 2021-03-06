import React from "react"
import styled from "styled-components"
import { theme } from "../styles/theme"

export type Props = {
  title: string
  url: string
}

const Container = styled.a`
  font-size: 3vw;
  text-decoration: none;
  color: ${theme.black};
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.black};
    color: ${theme.beige};
  }
`

export default class SocialComponent extends React.Component<Props> {

  render() {
    return <Container rel="noopener" href={this.props.url}>{this.props.title}</Container>
  }
}
