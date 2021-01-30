import React from "react"
import styled from "styled-components"

export type Props = {
  title: string
  company: string
  companyUrl?: string
  description?: string
  period: string
  location: "left" | "right"
}


const Container = styled.div<Props>`
  display: flex;
  padding: 32px 32px;
  cursor: default;
  flex-direction: ${(props: Props) => props.location === "left" ? "row" : "row-reverse"};
  border-top-style: solid;
  margin-bottom: 8px;
  border-width: thick;
`


const TitleContainer = styled.div<Props>`
  display: flex;
  flex: 0;
  flex-direction: ${(props: Props) => props.location === "left" ? "row" : "row-reverse"};
`

const Title = styled.div`
  flex: 0;
  font-size: 144px;
  padding: 8px 16px;
  //border-style: solid;
  //border-color: white;
  //border-width: thick;
  background-color: #e97967;
`

const Description = styled.div`
`

const CompanyContainer = styled.a`
  text-decoration: none;


  &:hover {
    background-color: #ab3339;
  }
`


const Company = styled.h2`
  color: #ab3339;
  padding: 0;
  margin: 0;

  &:hover {
    color: beige;
  }
`
const Period = styled.h3`
`


const Details = styled.div<Props>`
  display: flex;
  flex: 1;
  padding: 0 16px;
  flex-direction: column;
  align-items: ${(props: Props) => props.location === "left" ? "flex-start" : "flex-end"};
`

export default class JobComponent extends React.Component<Props> {
  render() {


    const chevron = "›"
    return <Container {...this.props}>
      <TitleContainer {...this.props}>
        <Title>{this.props.title}</Title>
      </TitleContainer>
      <Details {...this.props}>
        <CompanyContainer href={this.props.companyUrl} target="_blank">
          <Company>{this.props.company} {chevron}</Company>
        </CompanyContainer>
        {this.props.description && <Description>{this.props.description}</Description>}
        <Period>{this.props.period}</Period>
      </Details>
    </Container>
  }
}
