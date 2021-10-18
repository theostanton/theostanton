import React, {ReactElement} from "react"
import styled from "styled-components"
import {theme, Theme} from "../styles/theme"
import {Stats} from "@stats/client";

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
  padding: 48px 32px;
  cursor: default;
  flex-direction: column;
  border-top-color: ${theme.black};
  border-top-style: solid;
  border-width: medium;

  @media (max-width: 1080px) {
    padding: 24px 16px ;
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
  margin: 0 16px 0 0;
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
  margin: 0 0 0 -8px;
  font-size: medium;

  &:hover {
    background-color: ${theme.black};;
    color: ${theme.beige};
  }
`

const CompanyText = styled.h2`
  color: ${theme.black};
  padding: 8px;
  margin: 0 0 0 -8px;
  overflow: hidden;
  font-size: medium;
`

const Period = styled.h3`
  padding: 0 8px;
  margin: 0 0 0 -8px;
  color: ${theme.black};
  font-weight: lighter;
  font-size: medium;
`


const Details = styled.div<LocationProps>`
  display: flex;
  padding: 8px 0 0;
  flex-direction: column;
  align-items: ${(props: LocationProps) => props.location === "left" ? "flex-start" : "flex-end"};
`

function Company(props: Props): ReactElement {
    const {company, companyUrl} = props
    if (companyUrl) {
        const chevron = "›"
        return <CompanyContainer rel="noopener" href={companyUrl} target="_blank"
                                 onClick={async () => {
                                     await Stats.click(company)
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
