import { Avatar, CardHeader, IconButton } from '@material-ui/core'
import React from 'react'
import { MoreVert } from '@material-ui/icons'

import { Container, CardDnd } from './styles'

export default function GroupCard({ children, ...rest }) {
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
          title="Curitiba 1"
          subheader="6 integrantes"
        />
        {children}
      </CardDnd>
    </Container>
  )
}
