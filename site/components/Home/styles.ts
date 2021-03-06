import styled from "styled-components"
import { theme } from "../../styles/theme"


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, serif;
  height: 100%;
  color: ${theme.black};
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`

export const Title = styled.div`
  font-size: 12vw;
  padding: 16px 16px;
  color: ${theme.beige};
  text-align: center;
  background-color: ${theme.black};
`

export const Socials = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 16px 8px;
`
