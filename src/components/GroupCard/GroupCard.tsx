import {
  Avatar,
  CardHeader,
  IconButton,
  CardProps,
  Divider,
  MenuItem
} from '@material-ui/core'
import React, { useState } from 'react'
import { AddCircleOutlineRounded, MoreVert } from '@material-ui/icons'

import { Container, CardDnd, SectionTitle, SpaceNull } from './styles'
import GroupItem from '../GroupItem/GroupItem'
import { GroupsData, useAdmin } from '../../hooks/admin'
import { useToast } from '../../hooks/toast'
import { DialogSelectUser } from '../DialogSelectUser/DialogSelectUser'

interface GroupCardDTO extends CardProps {
  data: GroupsData
}

export default function GroupCard({ data, ...rest }: GroupCardDTO) {
  const { facilitadores, users } = data
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

  const { addToast } = useToast()
  const {
    addFacilitadorToGroup,
    groupsContext,
    facilitadoresContext
  } = useAdmin()

  const handleOpenFacilitadorSelect = (selectedGroupId: number) => {
    // console.log('selectedGroupId', selectedGroupId)
    setSelectedGroup(selectedGroupId)
    setDialogOpen(true)
  }

  const handleOpenUserSelect = (selectedGroupId: number) => {
    console.log('selectedGroupId', selectedGroupId)
    setSelectedGroup(selectedGroupId)
    setDialogOpen(true)
  }

  const handleConfirmDialog = async (facilitadorId: number) => {
    try {
      // await removeFacilitadorFromGroup(userToDelete, group, groupsContext)
      // setDialogOpen(false)
      // setUserToDelete(null)
      await addFacilitadorToGroup(facilitadorId, selectedGroup, groupsContext)

      setDialogOpen(false)
      setSelectedGroup(null)
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar facilitador',
        description:
          'Ocorreu um erro ao remover facilitador do grupo, atualize a página e tente novamente ou entre em contato com o suporte.'
      })
    }
  }

  const handleCancelDialog = () => {
    setDialogOpen(false)
  }

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
        <div className="sectionDiv">
          <SectionTitle>Facilitadores:</SectionTitle>
          <IconButton
            onClick={() => handleOpenFacilitadorSelect(data.id)}
            size="small"
          >
            <AddCircleOutlineRounded fontSize="small" />
          </IconButton>
        </div>
        <Divider />
        {facilitadores.length === 0 ? (
          <SpaceNull>Sem facilitador</SpaceNull>
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
        <div className="sectionDiv">
          <SectionTitle>Integrantes:</SectionTitle>
          <IconButton
            onClick={() => handleOpenUserSelect(data.id)}
            size="small"
          >
            <AddCircleOutlineRounded fontSize="small" />
          </IconButton>
        </div>
        <Divider />
        {users.length === 0 ? (
          <SpaceNull>Sem Usuário</SpaceNull>
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
      <DialogSelectUser
        handleConfirm={handleConfirmDialog}
        handleCancel={handleCancelDialog}
        open={dialogOpen}
        titleText="Adicionar Facilitador"
        commentText="Selecione um facilitador para ser adicionado ao grupo"
      >
        {facilitadoresContext &&
          facilitadoresContext.map((facilitador, index) => {
            console.log('chegando aqui')
            return (
              <MenuItem key={index} value={facilitador.id}>
                {facilitador.nome}
              </MenuItem>
            )
          })}
      </DialogSelectUser>
      <DialogSelectUser
        handleConfirm={handleConfirmDialog}
        handleCancel={handleCancelDialog}
        open={dialogOpen}
        titleText="Adicionar Usuário"
        commentText="Selecione um usuário para ser adicionado ao grupo"
      />
    </Container>
  )
}
