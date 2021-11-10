import { FormControlLabel, Grid, Switch } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import api from '../../../services/api'
import GroupCard from '../components/GroupCard/GroupCard'
import { Container, Header, Content } from './styles'

// import { Container } from './styles';

export interface facilitadorProps {
  id: number
  nome: string
  nome_usuario: number
}

interface avatarProps {
  id: number
  url: string
}

export interface userProps {
  id: number
  username: string
  Cidade: string
  Estado: string
  Nacimento: string
  avatar: avatarProps
  blocked: boolean
  confirmed: boolean
  email: string
  endereco: string
  endereco_adicional: string
  ex_participante: boolean
  funcao: number
  grupo: number
  nome_completo: string
  role: number
  telefone: string
}

export interface groupsProps {
  id: number
  facilitadores: facilitadorProps[]
  nome: string
  nome_abreviado: string
  users: userProps[]
}

function AdminGroups() {
  // const [data, setData] = useState({ username: 'luan' })
  const [groups, setGroups] = useState<null | groupsProps[]>()
  const [wrapState, setWrapState] = useState<boolean>(false)

  useEffect(() => {
    // api.get(`users/me`).then(response => {
    //   setData(response.data)
    //   console.log(response.data)
    // })

    api.get('grupos').then(response => {
      console.log('resposta', response.data)
      setGroups(response.data)
    })
  }, [setGroups])

  function handleWrap() {
    setWrapState(!wrapState)
  }

  return (
    <Container>
      <Header>
        <FormControlLabel
          control={
            <Switch
              name="wrapState"
              color="primary"
              checked={wrapState}
              onChange={handleWrap}
            />
          }
          label="Quebrar linha"
          labelPlacement="start"
        />
      </Header>
      <Content>
        <DragDropContext onDragEnd={() => {}}>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="flex-start"
            wrap={wrapState === true ? 'wrap' : 'nowrap'}
          >
            {groups &&
              groups.map(element => {
                console.log('element', element)
                return (
                  <Droppable
                    key={element.id}
                    droppableId={element.nome_abreviado}
                  >
                    {provided => (
                      <Grid
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        item
                      >
                        <GroupCard data={element} elevation={3} />
                      </Grid>
                    )}
                  </Droppable>
                )
              })}
          </Grid>
        </DragDropContext>
      </Content>
    </Container>

    // <div>
    //   <Droppable droppableId="TodosList">
    //     {provided => (
    //       <div
    //         className="container"
    //         ref={provided.innerRef}
    //         {...provided.droppableProps}
    //       >
    //         <Draggable draggableId="1" index="1">
    //           {provided => (
    //             <div
    //               className="todos"
    //               {...provided.draggableProps}
    //               {...provided.dragHandleProps}
    //               ref={provided.innerRef}
    //             >
    //               <span className="todos_headings">Active</span>
    //             </div>
    //           )}
    //         </Draggable>
    //         {provided.placeholder}
    //       </div>
    //     )}
    //   </Droppable>

    //   <Droppable droppableId="TodoRemove">
    //     {provided => (
    //       <div
    //         className="container"
    //         ref={provided.innerRef}
    //         {...provided.droppableProps}
    //       >
    //         <div className="todos">
    //           <span className="todos_headings">Active</span>
    //         </div>
    //       </div>
    //     )}
    //   </Droppable>
    // </div>
  )
}

export default AdminGroups
