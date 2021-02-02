import React from "react"
import { GetStaticProps, GetStaticPropsResult } from "next"
import styled from "styled-components"
import JobComponent, { Props as JobProps } from "../components/Job"
import SocialComponent, { Props as SocialProps } from "../components/Social"


type Props = {
  jobs: Omit<JobProps, "location">[]
  socials: SocialProps[]
}

export const getStaticProps: GetStaticProps<Props> = async context => {

  const props: Props = {
    jobs: [
      {
        title: "Head of\nEngineering",
        company: "Sport Heroes",
        companyUrl: "https://sportheroes.com",
        period: "October 2020 - Present"
      },
      {
        title: "CTO",
        company: "Floom",
        companyUrl: "https://floomx.com",
        description: "Some other description",
        period: "2020"
      },
      {
        title: "Senior Software\nEngineer",
        company: "Citymapper",
        companyUrl: "https://citymapper.com",
        period: "2018"
      },
      {
        title: "Head of\nProduct",
        company: "Dojo",
        period: "2017"
      },
      {
        title: "Android\nDeveloper",
        company: "Dojo",
        period: "2016"
      }
    ],
    socials: [
      {
        title: "Email",
        url: "mailto:theo@theo.dev?subject=Hello Theo"
      },
      {
        title: "Instagram",
        url: "https://instagram.com/theostanton"
      },
      {
        title: "Github",
        url: "https://github.com/theostanton"
      },
      {
        title: "LinkedIn",
        url: "https://linkedin.com/in/theostanton"
      },
      {
        title: "Strava",
        url: "https://www.strava.com/athletes/4142500"
      }
    ]
  }

  return {
    props
  } as GetStaticPropsResult<Props>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, serif;
  height: 100%;
  color: #000000bb;
`

const Title = styled.div`
  //font-size: 196px;
  font-size: 12vw;
  margin: 32px;
  padding: 0 8px;
  color: beige;
  //align-self: flex-start;
  text-align: center;
  background-color: #000000dd;
`

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 32px 32px;
  border-top-style: solid;
  border-width: thick;
`


const Home: React.FC<Props> = ({ jobs, socials }: Props) => {

  return (
    <Container>
      <Title>Theo Stanton</Title>
      <Socials>
        {socials.map(social => {
          return <SocialComponent key={social.title} {...social} />
        })}
      </Socials>
      {jobs.map((job, index) => {
        return <JobComponent key={index} {...job} location={"left"} />
      })}
    </Container>
  )
}

export default Home
