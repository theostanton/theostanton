import React, { ReactElement } from "react"
import styled from "styled-components"
import { theme, Theme } from "../styles/theme"
import { usePlausible } from "next-plausible"

export type Props = {
  title: string
  company: string
  companyUrl?: string
  description?: string
  period: string
  location: "left" | "right"
}

type LocationProps = Pick<Props, "location">

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 32px;
  cursor: default;
  flex-direction: column;
  border-top-color: ${theme.black};
  border-top-style: solid;
  border-width: thick;

  @media (max-width: 1080px) {
    padding: 32px 16px ;
  }
`


const TitleContainer = styled.div<LocationProps>`
  display: flex;
  height: fit-content;
  flex-direction: ${(props: LocationProps) => props.location === "left" ? "row" : "row-reverse"};
`

const Title = styled.div`
  font-size: 6vw;
  padding: 8px 16px;
  margin-right: 16px;
  color: ${theme.black};
  background-color: #e97967;
`

const Description = styled.div`
`

const CompanyContainer = styled.a`
  text-decoration: none;
`

const CompanyButton = styled.h2`
  color: ${theme.black};;
  padding: 8px;
  margin: 0;

  &:hover {
    background-color: ${theme.black};;
    color: ${theme.beige};
  }
`

const CompanyText = styled.h2`
  color: ${theme.black};
  padding: 8px;
  margin: 0;
  overflow: hidden;
`

const Period = styled.h3`
  padding: 0 8px;
  color: ${theme.black};
`


const Details = styled.div<LocationProps>`
  display: flex;
  padding: 16px 0 0;
  flex-direction: column;
  align-items: ${(props: LocationProps) => props.location === "left" ? "flex-start" : "flex-end"};
`

function Company(props: Props): ReactElement {
  const { company, companyUrl } = props
  const plausible = usePlausible()
  if (companyUrl) {
    const chevron = "›"
    return <CompanyContainer rel="noopener" href={companyUrl} target="_blank" onClick={() => {
      plausible(company)
    }
    }>
      <CompanyButton {...props}>{company} {chevron}</CompanyButton>
    </CompanyContainer>
  } else {
    return <CompanyText {...props}>{company}</CompanyText>
  }
}

const JobComponent: React.FC<Props> = ((props: Props) => {
  return <Container>
    <TitleContainer location={props.location}>
      <Title>{props.title}</Title>
    </TitleContainer>
    <Details location={props.location}>
      <Company {...props} />
      {props.description && <Description>{props.description}</Description>}
      <Period>{props.period}</Period>
    </Details>
  </Container>
})

export default JobComponent
