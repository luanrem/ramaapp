import { AppBar, Tabs, Tab } from '@material-ui/core'
import { ChangeEvent, useState, useEffect } from 'react'
import Admin from '../../layouts/Admin'

import { Container, Content } from '../../styles/pages/admin/facilitacao'
import AdminUsers from '../../components/AdminTabs/AdminUsers/AdminUsers'
import AdminGroups from '../../components/AdminTabs/AdminGroups/AdminGroups'
import { parseCookies } from 'nookies'

function Facilitacao({ response: userList }) {
  const [value, setValue] = useState(0)
  // https://missao-rama-sistema.vercel.app/
  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  // useEffect(() => {
  //   console.log('userList', userList)
  // }, [userList])

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
        <AppBar className="AppBarHeader" position="static" color="default">
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Usuários" />
            <Tab label="Grupos" />
            <Tab label="Eventos" />
          </Tabs>
        </AppBar>

        <Content>
          {(() => {
            switch (value) {
              case 0:
                return <AdminUsers />

              case 1:
                return <AdminGroups />

              case 2:
                return <div>Teste</div>

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

export async function getServerSideProps(context) {
  const jwt = parseCookies(context).jwt

  const login = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  })

  const response = await login.json()

  console.log('users', response)

  return {
    props: {
      response
    }
  }
}

export default Facilitacao
