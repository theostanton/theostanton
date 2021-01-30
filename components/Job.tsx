import React from "react"
import styled from "styled-components"

export type Props = {
  title: string
  description: string
  period: string
  location: "left" | "right"
}


const Title = styled.h1`
  color: orange;
`

export default class JobComponent extends React.Component<Props> {
  render() {


    const Container = styled.div`
      display: flex;
      flex-direction: column;
      background-color: yellowgreen;
      text-align: ${this.props.location};
    `

    return <Container>
      <Title>{this.props.title}</Title>
    </Container>
  }
}
