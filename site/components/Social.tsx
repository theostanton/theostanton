import React from "react"
import styled from "styled-components"
import {theme} from "../styles/theme"

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
        return <Container rel="noopener" href={this.props.url}
                          onClick={async () => {
                          }
                          }>{this.props.title}</Container>
    }
}
