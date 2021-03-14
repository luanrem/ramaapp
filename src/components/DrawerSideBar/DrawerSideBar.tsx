import { Container, AvatarContainer } from '../../styles/components/DrawerSideBar';

import MenuButton from '../MenuButton/MenuButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import routes from '../../routes/routes';
import { Avatar, Button, Icon, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import React, { useCallback } from 'react';
import Link from 'next/link';

export default function DrawerSideBar({ setOpen, open }) {

  const HandleOpenDrawer = useCallback(() => {
    setOpen(!open);
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
          <Avatar src="https://avatars.githubusercontent.com/u/46967826?s=460&u=b03c7750b76f86e592f9f3b0e02fe025846ee38c&v=4" 
            alt="Profile Image"
            className="avatar"
          />
          <h2>Luan Martins</h2>
          <span>Facilitador</span>
        </AvatarContainer>

        {
          routes.map((prop, key) => {
            return (
              <Link href={prop.layout + prop.path}>
                <ListItem>
                  <Icon className="Icon">{prop.icon}</Icon>
                  <ListItemText primary={prop.name} />
                </ListItem>
              </Link>

            );
          })
        }

      </List>

    </Container>
  )
}