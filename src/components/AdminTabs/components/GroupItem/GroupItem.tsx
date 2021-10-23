import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  IconButton
} from '@material-ui/core'
import { ExpandMoreTwoTone, Edit } from '@material-ui/icons'
import React from 'react'

import { Container } from './styles'

export default function GroupItem() {
  return (
    <Container>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreTwoTone />}
          className="AccordionSummary"
        >
          <Avatar
            src="https://avatars.githubusercontent.com/u/46967826?v=4"
            alt="Profile Image"
          />
          <div className="profileUser">
            <h4>10 - luanrem</h4>
            <span>Coordenador</span>
          </div>
        </AccordionSummary>
        <AccordionDetails className="AccordionDetails">
          <Grid container spacing={1}>
            <Grid item xl={1}>
              <h4>Nome:</h4>
              <p>Luan Roberto Estrada Martins</p>
            </Grid>
            <Grid item xl={1}>
              <h4>Email:</h4>
              <p>luanrem@gmail.com</p>
            </Grid>
            <Grid item xl={1}>
              <h4>Telefone:</h4>
              <p>(41) 998188803</p>
            </Grid>
            <IconButton>
              <Edit />
            </IconButton>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}
