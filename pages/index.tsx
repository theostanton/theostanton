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
          title: "Some title",
          description: "Some description",
          period: "2019"
        },
        {
          title: "Some other title",
          description: "Some other description",
          period: "2020"
        }
      ]
    }
  } as GetStaticPropsResult<Props>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
`

const Title = styled.h1`
  flex: 0;
  color: #ffffffbb;
  font-style: italic;
`


const Home: React.FC<Props> = ({ jobs }: Props) => {
  return (
    <Container>
      <Title>Theo Stanton</Title>
      {jobs.map((job, index) => {
        return <JobComponent {...job} location={index % 2 == 0 ? "left" : "right"} />
      })}
    </Container>
  )
}

export default Home
