import { FormControlLabel, Grid, Switch } from '@material-ui/core'
import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useAdmin } from '../../../hooks/admin'
import GroupCard from '../components/GroupCard/GroupCard'
import { Container, Header, Content } from './styles'

// import { Container } from './styles';

function AdminGroups() {
  // const [data, setData] = useState({ username: 'luan' })
  const [wrapState, setWrapState] = useState<boolean>(false)

  const { groupsContext } = useAdmin()

  // useEffect(() => {
  //   api.get('grupos').then(response => {
  //     // console.log('resposta', response.data)
  //     setGroups(response.data)
  //   })
  // }, [setGroups])

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
            {groupsContext &&
              groupsContext.map(element => {
                // console.log('element', element)
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
  )
}

export default AdminGroups
