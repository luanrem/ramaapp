import { AppBar, Tabs, Tab } from '@material-ui/core'
import { ChangeEvent, useState } from 'react'
import Admin from '../../layouts/Admin'

import ADMTest1 from '../../components/ADMTest1/ADMTest1'

import { Container, Content } from '../../styles/pages/admin/facilitacao'

function Facilitacao() {
  const [value, setValue] = useState(0)
  //missao-rama-sistema.vercel.app/
  https: const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  // const IsShowing = useEffect(() => {
  //   console.log(value)
  //   if (value === 1) {
  //     console.log('caiu')
  //   }
  //   setIsShowing.
  // }, [value])

  return (
    <Container>
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Item 1" />
            <Tab label="Item 2" />
            <Tab label="Item 3" />
            <Tab label="Item 4" />
            <Tab label="Item 5" />
            <Tab label="Item 6" />
            <Tab label="Item 7" />
            <Tab label="Item 8" />
            <Tab label="Item 9" />
          </Tabs>
        </AppBar>

        <Content>
          {(() => {
            switch (value) {
              case 0:
                return <div>You are a Admin.</div>

              case 1:
                return <ADMTest1 />

              default:
                return <div>You are a User.</div>
            }
          })()}
        </Content>
      </div>
    </Container>
  )
}

Facilitacao.layout = Admin

export default Facilitacao
