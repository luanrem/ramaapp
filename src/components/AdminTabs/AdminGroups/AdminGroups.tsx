import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import api from '../../../services/api'
import GroupCard from '../components/GroupCard/GroupCard'
import GroupItem from '../components/GroupItem/GroupItem'
import { Container } from './styles'

// import { Container } from './styles';

function AdminGroups() {
  const [data, setData] = useState({ username: 'luan' })
  const [groups, setGroups] = useState()

  useEffect(() => {
    api.get(`users/me`).then(response => {
      setData(response.data)
      console.log(response.data)
    })

    api.get('grupos').then(response => {
      console.log('resposta', response.data)
      setGroups(response.data)
    })
  }, [setData])

  return (
    <Container>
      <Grid container spacing={1} direction="row" alignItems="center">
        <Grid item xl={2}>
          <GroupCard elevation={3}>
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
          </GroupCard>
        </Grid>
        <Grid item xl={2}>
          <GroupCard elevation={3}>
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
          </GroupCard>
        </Grid>
        <Grid item xl={2}>
          <GroupCard elevation={3}>
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
          </GroupCard>
        </Grid>
        <Grid item xl={2}>
          <GroupCard elevation={3}>
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
          </GroupCard>
        </Grid>
        <Grid item xl={2}>
          <GroupCard elevation={3}>
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
          </GroupCard>
        </Grid>
        <Grid item xl={2}>
          <GroupCard elevation={3}>
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
            <GroupItem />
          </GroupCard>
        </Grid>
      </Grid>
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
