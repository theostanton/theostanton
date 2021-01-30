import React from "react"
import { GetStaticProps, GetStaticPropsResult } from "next"
import styled from "styled-components"


type Props = {
  value: string
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  return {
    props: { value: "some string" }
  } as GetStaticPropsResult<Props>
}


const Title = styled.h1`
  color: red;
  font-style: italic;
`


const Home: React.FC<Props> = (props: Props) => {
  return (
    <Title>Hi props.value={props.value}</Title>
  )
}

export default Home
