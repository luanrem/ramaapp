import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  IconButton
} from '@material-ui/core'
import { ExpandMoreTwoTone, Edit, HighlightOff } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useToast } from '../../../../hooks/toast'
import api from '../../../../services/api'
import { facilitadorProps, userProps } from '../../AdminGroups/AdminGroups'
import DialogConfirmation from '../DialogConfirmation/DialogConfirmation'
import DialogUserEdit, { UsersFormat } from '../DialogUserEdit/DialogUserEdit'

import { Content, Container } from './styles'

interface NomeUsuarioprops {
  avatar: {
    url: string
  }
  username: string
}

interface FacilitadorDataProps {
  id: number
  nome: string
  nome_usuario: NomeUsuarioprops
}

interface GroupItemDTO {
  user?: userProps
  group: string
  index: number
  facilitador?: facilitadorProps
}

export default function GroupItem({
  user,
  group,
  index,
  facilitador
}: GroupItemDTO) {
  const [userOpenEdit, setUserOpenEdit] = useState(false)
  const [userOpened, setUserOpened] = useState<UsersFormat>(null)
  const [
    facilitadorData,
    setFacilitadorData
  ] = useState<FacilitadorDataProps | null>()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>()

  const { addToast } = useToast()

  useEffect(() => {
    facilitador &&
      api.get(`facilitadores/${facilitador.id}`).then(response => {
        console.log('facilitador resposta', response.data)
        setFacilitadorData(response.data)
      })
    // console.log('usuario entrou', user, index)
  }, [facilitador])

  const handleOpenEdit = userId => {
    api.get(`users/${userId}`).then(response => {
      const user = response.data
      const avatar = user.avatar
        ? `${process.env.NEXT_PUBLIC_API_URL}${user.avatar.url}`
        : null
      const funcao = user.funcao ? user.funcao.Funcao : null
      const group = user.grupo ? user.grupo.nome : null
      const UserToEdit: UsersFormat = {
        id: user.id,
        avatar_url: avatar,
        username: user.username,
        nome_completo: user.nome_completo,
        blocked: user.blocked,
        grupo: group,
        function: funcao,
        nacimento: user.Nacimento,
        email: user.email,
        ex_participante: user.ex_participante,
        endereco: user.endereco,
        endereco_adicional: user.endereco_adicional,
        cidade: user.Cidade,
        estado: user.Estado,
        telefone: user.telefone
      }
      setUserOpened(UserToEdit)
      // console.log('finalUser', userOpened)
      setUserOpenEdit(true)
    })
  }

  const handleOpenConfirmation = userId => {
    setDialogOpen(true)
    setUserToDelete(userId)
  }

  const handleConfirmDialog = async () => {
    try {
      await handleRemoveFacilitador(userToDelete)

      addToast({
        type: 'success',
        title: `O facilitador foi removido com sucesso`,
        description: ''
      })

      setDialogOpen(false)
      setUserToDelete(null)
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
    setUserToDelete(null)
  }

  const handleRemoveFacilitador = async userId => {
    // console.log('remove facilitador', userId, group)
    api
      .get('grupos', {
        params: {
          nome_abreviado: group
        }
      })
      .then(response => {
        // console.log('grupo chamado', response.data)
        // eslint-disable-next-line array-callback-return
        const newFacilitadores = response.data[0].facilitadores.filter(user => {
          if (user.id !== userId) return user
        })
        // console.log('usuario', newFacilitadores)
        return [response.data[0].id, newFacilitadores]
      })
      .then(response => {
        // console.log(response)
        api
          .put(`grupos/${response[0]}`, {
            facilitadores: response[1]
          })
          .then(response => console.log('resposta final', response))
      })
  }

  return (
    <Content>
      {user && (
        <Draggable
          draggableId={
            'user - ' + group + user.id.toString() + index.toString()
          }
          index={index}
        >
          {provided => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreTwoTone />}
                  className="AccordionSummary"
                >
                  <Avatar
                    src={
                      user.avatar &&
                      process.env.NEXT_PUBLIC_API_URL.concat(user.avatar.url)
                    }
                    alt="Profile Image"
                  />
                  <div className="profileUser">
                    <h4>
                      {user.id} - {user.username ? user.username : 'SemNome'}
                    </h4>
                    <span>Integrante</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="AccordionDetails">
                  <Grid container spacing={1}>
                    <Grid item>
                      <h4>Nome:</h4>
                      <p>
                        {user.nome_completo
                          ? user.nome_completo
                          : 'Usuário sem nome'}
                      </p>
                    </Grid>
                    <Grid item>
                      <h4>Email:</h4>
                      <p>{user.email ? user.email : 'Usuário sem email'}</p>
                    </Grid>
                    <Grid item>
                      <h4>Telefone:</h4>
                      <p>{user.telefone ? user.telefone : '(11) 1111-1111'}</p>
                    </Grid>
                    <IconButton onClick={() => handleOpenEdit(user.id)}>
                      <Edit />
                    </IconButton>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Container>
          )}
        </Draggable>
      )}
      {facilitadorData && (
        <Container>
          <Accordion>
            <AccordionSummary className="AccordionSummary">
              <Avatar
                src={
                  facilitadorData.nome_usuario.avatar &&
                  process.env.NEXT_PUBLIC_API_URL.concat(
                    facilitadorData.nome_usuario.avatar.url
                  )
                }
                alt="Profile Image"
              />
              <div className="profileUser">
                <h4>
                  {facilitadorData.nome_usuario.username
                    ? facilitadorData.nome_usuario.username
                    : 'SemNome'}
                </h4>
                <span>Facilitador</span>
              </div>
            </AccordionSummary>
            <AccordionDetails className="AccordionDetails">
              <Grid container spacing={1}>
                <Grid item xs>
                  <IconButton
                    onClick={() => handleOpenConfirmation(facilitadorData.id)}
                  >
                    <HighlightOff color="secondary" />
                  </IconButton>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Container>
      )}
      <DialogUserEdit
        user={userOpened}
        open={userOpenEdit}
        handleOpen={setUserOpenEdit}
      />
      <DialogConfirmation
        handleConfirm={handleConfirmDialog}
        handleCancel={handleCancelDialog}
        open={dialogOpen}
        titleText="Tem certeza disso?"
        commentText="Você está prestes a retirar este facilitador deste grupo."
      />
    </Content>
  )
}
