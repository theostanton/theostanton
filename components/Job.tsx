import React, { ReactElement } from "react"
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
  background-color: #e97967;
  white-space: nowrap;
`

const Description = styled.div`
`

const CompanyContainer = styled.a`
  text-decoration: none;
`

const CompanyButton = styled.h2`
  color: #000000dd;
  padding: 8px;
  margin: 0;

  &:hover {
    background-color: #000000dd;
    color: beige;
  }
`

const CompanyText = styled.h2`
  color: #000000dd;
  padding: 8px;
  margin: 0;
  overflow: hidden;
`

const Period = styled.h3`
  padding: 0 8px;
`


const Details = styled.div<Props>`
  display: flex;
  flex: 1;
  padding: 0 16px;
  flex-direction: column;
  align-items: ${(props: Props) => props.location === "left" ? "flex-start" : "flex-end"};
`

function Company({ company, companyUrl }: Props): ReactElement {
  if (companyUrl) {
    const chevron = "›"
    return <CompanyContainer href={companyUrl} target="_blank">
      <CompanyButton>{company} {chevron}</CompanyButton>
    </CompanyContainer>
  } else {
    return <CompanyText>{company}</CompanyText>
  }
}

export default class JobComponent extends React.Component<Props> {

  render() {


    return <Container {...this.props}>
      <TitleContainer {...this.props}>
        <Title>{this.props.title}</Title>
      </TitleContainer>
      <Details {...this.props}>
        <Company {...this.props} />
        {this.props.description && <Description>{this.props.description}</Description>}
        <Period>{this.props.period}</Period>
      </Details>
    </Container>
  }
}
