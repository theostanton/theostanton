import React from "react"
import { GetStaticProps, GetStaticPropsResult } from "next"
import styled from "styled-components"
import JobComponent, { Props as JobProps } from "../components/Job"


type Props = {
  jobs: Omit<JobProps, "location">[]
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  return {
    props: {
      jobs: [
        {
          title: "Head of Engineering",
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
          title: "Senior Software Engineer",
          company: "Citymapper",
          companyUrl: "https://citymapper.com",
          period: "2018"
        },
        {
          title: "Head of Product",
          company: "Dojo",
          period: "2017"
        },
        {
          title: "Android Developer",
          company: "Dojo",
          period: "2016"
        }
      ]
    }
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
  font-size: 196px;
  margin: 32px;
  padding: 0 8px;
  color: beige;
  //align-self: flex-start;
  text-align: center;
  background-color: #000000dd;
`


const Home: React.FC<Props> = ({ jobs }: Props) => {

  return (
    <Container>
      <Title>Theo Stanton</Title>
      {jobs.map((job, index) => {
        return <JobComponent key={index} {...job} location={index % 2 == 0 ? "left" : "right"} />
      })}
    </Container>
  )
}

export default Home
