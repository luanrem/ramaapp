import { useCallback, useState } from 'react';

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';

import Poppers from "@material-ui/core/Popper";

import { Container, NameContainer, NotificationBall, NotificationList, ScrollbarsContainer, MotionDiv } from '../../styles/components/NavBarProfile';
import { Button, ClickAwayListener, Divider, ListItem, ListItemText, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import Link from 'next/link';

import { useAuth } from '../../hooks/auth';

export default function NavBarProfile() {
  const [hasNotification, setHasNotification] = useState(true);
  const [openNotification, setOpenNotification] = useState<null | HTMLElement>(null);
  const [openPhoto, setOpenPhoto] = useState<null | HTMLElement>(null);

  const { signOut, user } = useAuth();

  const handleClickNotification = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpenNotification(openNotification ? null : event.currentTarget);
    setHasNotification(!hasNotification);
  }, [openNotification]);

  const handleCloseNotification = useCallback(() => {
    setOpenNotification(null);
    setHasNotification(!hasNotification);
  }, [setOpenNotification]);

  const handleClickPhoto = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpenPhoto(openPhoto ? null : event.currentTarget);
  }, [openPhoto]);

  const handleClosePhoto = useCallback(() => {
    setOpenPhoto(null);
  }, [setOpenPhoto]);

  const handleLogOff = useCallback(() => {
    setOpenPhoto(null);
    signOut();
  }, [setOpenPhoto])


  return (
    <Container >
      <Button onClick={handleClickNotification}>
        <NotificationsNoneIcon fontSize="large" className="Notifications" />
        {hasNotification &&
          <NotificationBall />
        }
      </Button>



      <Poppers
        open={Boolean(openNotification)}
        anchorEl={openNotification}
      >
        <MotionDiv
          initial={{
            scaleY: 0,
            y: -100
          }}
          animate={{
            scaleY: 1,
            y: 0
          }}
          transition={{
            type: "tween"
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleCloseNotification}>
              <NotificationList>
                <ScrollbarsContainer>
                  <List>
                    <ListItem button>
                      <ListItemText primary="Notificacao" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText primary="Notificacao" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText primary="Notificacao" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText primary="Notificacao" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText primary="Notificacao" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText primary="Notificacao" />
                    </ListItem>
                    <Divider />
                  </List>
                </ScrollbarsContainer>
              </NotificationList>
            </ClickAwayListener>
          </Paper>
        </MotionDiv>

      </Poppers>


      <NameContainer>
        <h2>{user.username}</h2>
        <span>{`Grupo: ${user.grupo.nome_abreviado}`}</span>
      </NameContainer>

      <Button onClick={handleClickPhoto}>
        <Avatar src="https://avatars.githubusercontent.com/u/46967826?s=460&u=b03c7750b76f86e592f9f3b0e02fe025846ee38c&v=4"
          alt="Profile Image"
          className="avatar"
        />
      </Button>

      <Poppers
        open={Boolean(openPhoto)}
        anchorEl={openPhoto}
      >
        <MotionDiv
          initial={{
            scaleY: 0,
            y: -100
          }}
          animate={{
            scaleY: 1,
            y: 0
          }}
          transition={{
            type: "tween",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClosePhoto}>
              <List>
                <Link href="/admin/perfil">
                  <ListItem button onClick={handleClosePhoto}>
                    <ListItemText primary="Perfil" />
                  </ListItem>
                </Link>
                <Link href="/admin/configuracao">
                  <ListItem button onClick={handleClosePhoto}>
                    <ListItemText primary="Configurações" />
                  </ListItem>
                </Link>
                  <ListItem button onClick={handleLogOff}>
                    <ListItemText primary="Desconectar" />
                  </ListItem>
              </List>
            </ClickAwayListener>
          </Paper>
        </MotionDiv>
      </Poppers>

      <Button className="VertIcon">
        <MoreVertIcon fontSize="large" />
      </Button>

    </Container>
  )
}