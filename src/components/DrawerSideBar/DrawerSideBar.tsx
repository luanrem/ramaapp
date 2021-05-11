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
  const { user, photoURL } = useAuth()
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
          <Avatar src={photoURL} alt="Profile Image" className="avatar" />
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
