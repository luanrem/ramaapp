import React, { useCallback, useState } from 'react'

import BackToTopIcon from '../components/BackToTopIcon/BackToTopIcon'

import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import {
  Button,
  ClickAwayListener,
  ListItem,
  ListItemText,
  Paper,
  List,
  Hidden
} from '@material-ui/core'
import Poppers from '@material-ui/core/Popper'
import Link from 'next/link'

import { Container, Header, MotionHeaderMenu } from '../styles/pages/Home'
import { useWindowScroll } from 'react-use'

export default function Home() {
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null)
  const { y } = useWindowScroll()

  const handleClickMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setOpenMenu(openMenu ? null : event.currentTarget)
    },
    [openMenu]
  )

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(null)
  }, [setOpenMenu])

  return (
    <Container>
      <Header headerBackground={y > 80}>
        <div className="space" />

        <Hidden mdDown>
          <ul>
            <li>
              <a href="#QuemSomosNosC">Quem somos nós</a>
            </li>
            <li>
              <a href="#NossaMeta">Nossa Meta</a>
            </li>
            <li>
              <a href="#ComoParticipar">Como Participar</a>
            </li>
            <li>
              <a href="#GaleriaDeAtividades">Galeria de atividades</a>
            </li>
            <li>
              <a href="#Contato">Contato</a>
            </li>
          </ul>
        </Hidden>

        <Button className="VertIcon" onClick={handleClickMenu}>
          <MenuRoundedIcon fontSize="large" />
        </Button>

        <Poppers open={Boolean(openMenu)} anchorEl={openMenu}>
          <MotionHeaderMenu
            initial={{
              scaleY: 0,
              y: -100
            }}
            animate={{
              scaleY: 1,
              y: 0
            }}
            transition={{
              type: 'tween'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <List>
                  <Link href="/auth/signin">
                    <ListItem button onClick={handleCloseMenu}>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </Link>
                  <Link href="/auth/signup">
                    <ListItem button onClick={handleCloseMenu}>
                      <ListItemText primary="Criar Conta" />
                    </ListItem>
                  </Link>
                </List>
              </ClickAwayListener>
            </Paper>
          </MotionHeaderMenu>
        </Poppers>
      </Header>

      <div className="vertialSpace"></div>

      <BackToTopIcon showBelow={80} />
    </Container>
  )
}
