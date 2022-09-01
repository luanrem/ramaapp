import { AppBar, Tabs, Tab } from '@material-ui/core'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
// import Admin from './Admin'

import { DragDropContext } from 'react-beautiful-dnd'
// import { useAdmin } from '../hooks/admin'
import { useAdmin } from '../mock/admin'
import { Content, Container } from '../styles/layouts/facilitacao'
import { useRouter } from 'next/router'

function Facilitacao({ children }) {
  const [value, setValue] = useState(0)
  const { getGroupsData, getFacilitadoresData } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    switch (router.pathname) {
      case '/admin/facilitacao/users':
        setValue(0)
        break
      case '/admin/facilitacao/groups':
        setValue(1)
        break
      case '/admin/facilitacao/events':
        setValue(2)
        break
    }
  }, [router.pathname, value])

  // https://missao-rama-sistema.vercel.app/
  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    // setValue(newValue)
  }

  useEffect(() => {
    getGroupsData()
    getFacilitadoresData()
  }, [])

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
    <DragDropContext onDragEnd={() => {}}>
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
              <Link href="users">
                <Tab label="Usuários" />
              </Link>
              <Link href="groups">
                <Tab label="Grupos" />
              </Link>
              <Tab label="Eventos" />
            </Tabs>
          </AppBar>
          <Content>{children}</Content>
        </div>
      </Container>
    </DragDropContext>
  )
}

// Facilitacao.layout = Admin

// export async function getServerSideProps(context) {
//   const jwt = parseCookies(context).jwt

//   const login = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${jwt}`
//     }
//   })

//   const response = await login.json()

//   console.log('users', response)

//   return {
//     props: {
//       response
//     }
//   }
// }

export default Facilitacao
