import React from "react"
import styled from "styled-components"
import { theme } from "../styles/theme"
import { usePlausible } from "next-plausible"

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
    const plausible = usePlausible()
    return <Container rel="noopener" href={this.props.url} onClick={() => {
      plausible("View social", { props: { social: this.props.title } })
    }
    }>{this.props.title}</Container>
  }
}
