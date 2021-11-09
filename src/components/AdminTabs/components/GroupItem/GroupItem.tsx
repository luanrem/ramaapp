import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  IconButton
} from '@material-ui/core'
import { ExpandMoreTwoTone, Edit } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import api from '../../../../services/api'
import { facilitadorProps, userProps } from '../../AdminGroups/AdminGroups'

import { Container } from './styles'

interface NomeUsuarioprops {
  avatar: {
    url: string
  }
  username: string
}

interface FacilitadorDataProps {
  nome: string
  nome_usuario: NomeUsuarioprops
}

interface GroupItemDTO {
  user?: userProps
  facilitador?: facilitadorProps
}

export default function GroupItem({ user, facilitador }: GroupItemDTO) {
  const [
    facilitadorData,
    setFacilitadorData
  ] = useState<FacilitadorDataProps | null>()

  useEffect(() => {
    facilitador &&
      api.get(`facilitadores/${facilitador.id}`).then(response => {
        console.log('facilitador resposta', response.data)
        setFacilitadorData(response.data)
      })
  }, [facilitador])

  return (
    <>
      {user && (
        <Container>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreTwoTone />}
              className="AccordionSummary"
            >
              <Avatar
                src={
                  user.avatar
                    ? process.env.NEXT_PUBLIC_API_URL.concat(user.avatar.url)
                    : 'https://avatars.githubusercontent.com/u/46967826?v=4'
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
                <IconButton>
                  <Edit />
                </IconButton>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Container>
      )}
      {facilitadorData && (
        <Container>
          <Accordion expanded>
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
          </Accordion>
        </Container>
      )}
    </>
  )
}
