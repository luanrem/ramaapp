import {
  Avatar,
  CardHeader,
  IconButton,
  CardProps,
  Divider
} from '@material-ui/core'
import React from 'react'
import { MoreVert } from '@material-ui/icons'

import { groupsProps } from '../../AdminGroups/AdminGroups'

import { Container, CardDnd, SectionTitle } from './styles'
import GroupItem from '../GroupItem/GroupItem'

interface GroupCardDTO extends CardProps {
  data: groupsProps
}

export default function GroupCard({ data, ...rest }: GroupCardDTO) {
  const { facilitadores, users } = data
  return (
    <Container>
      <CardDnd {...rest}>
        <CardHeader
          avatar={<Avatar>CTB1</Avatar>}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={data.nome}
          subheader={data.users.length.toString().concat(' Integrantes')}
        />
        <SectionTitle>Facilitadores:</SectionTitle>
        <Divider />
        {facilitadores.length === 0 ? (
          <div>Usuario vazio</div>
        ) : (
          facilitadores.map((facilitador, index) => {
            return (
              <GroupItem
                group={data.nome_abreviado}
                facilitador={facilitador}
                index={index}
                key={facilitador.id}
              />
            )
          })
        )}
        <SectionTitle>Integrantes:</SectionTitle>
        <Divider />
        {users.length === 0 ? (
          <div>Usuario vazio</div>
        ) : (
          users.map((user, index) => {
            return (
              <GroupItem
                group={data.nome_abreviado}
                user={user}
                index={index}
                key={user.id}
              />
            )
          })
        )}
      </CardDnd>
    </Container>
  )
}
