import React from "react"
import styled from "styled-components"
import { theme } from "../../styles/theme"


export type Props = {
  text: TAB
  highlighted: boolean
  onClick: () => void
}

export type TAB = "Career" | "Socials" | "Contact"
export const tabs: TAB[] = ["Career", "Socials", "Contact"]

const Container = styled.div<Props>`
  flex-grow: 1;
  text-align: center;
  padding: 16px 16px;
  cursor: pointer;
  font-size: 2vw;
  color: ${(props: Props) => props.highlighted ? theme.black : theme.beige};
  border-color: ${theme.beige};
  //border-color: red;
  border-style: solid none none;
  border-width: thin thin;
  background-color: ${(props: Props) => props.highlighted ? theme.beige : theme.black};
`

export default class TabComponent extends React.Component<Props> {
  render() {
    return <Container {...this.props}>
      {this.props.text}
    </Container>
  }
}
