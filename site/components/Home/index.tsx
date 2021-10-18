import React, {useEffect} from "react"

import {props} from "./props"
import {Container, Title, Content, Socials} from "./styles"
import SocialComponent from "components/Social"
import JobComponent from "components/Job"
import {Stats} from "@stats/client"

async function trackHomePageView(): Promise<void> {
    await Stats.view("Home")
}

const Home: React.FC<props> = ((props: props) => {

    useEffect(() => {
        trackHomePageView().then().catch()
    })

    const {jobs, socials} = props
    return <Container>
        <Title>Theo Stanton</Title>
        <Content>
            <Socials {...props}>
                {socials.map(social => {
                    return <SocialComponent key={social.title} {...social} />
                })}
            </Socials>
            {jobs.map((job, index) => {
                return <JobComponent key={index} {...job} location={"left"}/>
            })}
        </Content>
    </Container>
})

export default Home
