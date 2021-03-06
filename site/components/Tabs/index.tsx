import React from "react"
import styled from "styled-components"
import TabComponent, { Props as TabProps, TAB, tabs } from "./Tab"
import { theme } from "../../styles/theme"

type Props = {}

type State = {
  highlightedTab: TAB
}


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  border-color: ${theme.black};
  border-style: none solid none;
  border-width: thick;
`


export default class TabsComponent extends React.Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      highlightedTab: tabs[0]
    }
  }

  render() {
    const tabProps: TabProps[] = tabs.map(tab => {
      return {
        highlighted: this.state.highlightedTab === tab,
        onClick: () => {
          this.setState({
            highlightedTab: tab
          })
        },
        text: tab
      }
    })

    return <Container>
      {tabProps.map(tab => {
        return <TabComponent {...tab} />
      })}
    </Container>
  }

}
