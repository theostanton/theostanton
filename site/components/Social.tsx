import React from "react"
import styled from "styled-components"
import { theme } from "../styles/theme"
import { usePlausible } from "next-plausible"
import { Stats } from "@stats/client"

export type Props = {
  title: string
  url: string
}

const Container = styled.a`
  flex: 0;
  margin: 8px 0;
  padding: 16px 8px;
  font-size: 3vw;
  text-decoration: none;
  color: ${theme.black};
  cursor: pointer;

  &:hover {
    background-color: ${theme.black};
    color: ${theme.beige};
  }
`

export default class SocialComponent extends React.Component<Props> {

  render() {
    const plausible = usePlausible()
    return <Container rel="noopener" href={this.props.url} onClick={async () => {
      plausible("View social", { props: { social: this.props.title } })
      await Stats.click(this.props.title)
    }
    }>{this.props.title}</Container>
  }
}
