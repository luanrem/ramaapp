import { useCallback } from 'react'
import {
  Container,
  AvatarContainer
} from '../../styles/components/DrawerSideBar'

import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'

import {
  Avatar,
  Button,
  Icon,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import Link from 'next/link'
import { useAuth } from '../../hooks/auth'

export default function DrawerSideBar({ setOpen, open }) {
  const { user } = useAuth()
  const { menus } = useAuth()
  console.log('Menus dentro do drawer', menus)

  const HandleOpenDrawer = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <Container>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <span>Menu</span>
            <Button onClick={HandleOpenDrawer}>
              <ArrowBackIosRoundedIcon />
            </Button>
          </ListSubheader>
        }
      >
        <AvatarContainer>
          <Avatar
            src="https://avatars.githubusercontent.com/u/46967826?s=460&u=b03c7750b76f86e592f9f3b0e02fe025846ee38c&v=4"
            alt="Profile Image"
            className="avatar"
          />
          <h2>{user.username}</h2>
          <span>{`Grupo: ${user.grupo.nome_abreviado}`}</span>
        </AvatarContainer>

        {menus.map((prop, key) => {
          return (
            <div className="menuButtons" key={key}>
              <Link href={prop.layout + prop.path}>
                <ListItem>
                  <Icon className="Icon">{prop.icon}</Icon>
                  <ListItemText primary={prop.name} />
                </ListItem>
              </Link>
            </div>
          )
        })}
      </List>
    </Container>
  )
}
