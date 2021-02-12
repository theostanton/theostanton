import React from "react"

import { Props } from "./props"
import { Container, Title, Content, Socials } from "./styles"
import SocialComponent from "../../components/Social"
import JobComponent from "../../components/Job"

const Home: React.FC<Props> = ((props: Props) => {
  const { jobs, socials } = props
  return (
    <Container>
      <Title>Theo Stanton</Title>
      <Content>
        <Socials {...props}>
          {socials.map(social => {
            return <SocialComponent key={social.title} {...social} />
          })}
        </Socials>
        {jobs.map((job, index) => {
          return <JobComponent key={index} {...job} location={"left"} />
        })}
      </Content>
    </Container>
  )
})

export default Home
