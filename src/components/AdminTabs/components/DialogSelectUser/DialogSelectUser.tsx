import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import React, { useState } from 'react'
import { useAdmin } from '../../../../hooks/admin'

import { ContainerDialog, ContainerBox } from './styles'

interface DialogSelectUserProps {
  handleConfirm: (data: number) => void
  handleCancel: () => void
  open: boolean
  titleText: string
  commentText: string
}

export default function DialogSelectUser(props: DialogSelectUserProps) {
  const { handleConfirm, handleCancel, open, titleText, commentText } = props
  const [facilitadorSelected, setFacilitadorSelected] = useState<number>()
  const { facilitadoresContext } = useAdmin()

  const handleFacilitadorSelectedChange = event => {
    // console.log('Chegou aqui', event.target)
    setFacilitadorSelected(event.target.value)
    // setMaxWidth(
    //   // @ts-expect-error autofill of arbitrary value is not handled.
    //   event.target.value,
    // );
  }

  return (
    <>
      <ContainerDialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText>{commentText}</DialogContentText>
        </DialogContent>
        <ContainerBox component="form">
          <FormControl className="facilitadorForm">
            <InputLabel htmlFor="facilitador">Facilitador</InputLabel>
            <Select
              autoFocus
              value={facilitadorSelected}
              onChange={handleFacilitadorSelectedChange}
              label="facilitador"
              inputProps={{
                name: 'facilitador',
                id: 'facilitador'
              }}
            >
              {facilitadoresContext &&
                facilitadoresContext.map((facilitador, index) => {
                  return (
                    <MenuItem key={index} value={facilitador.id}>
                      {facilitador.nome}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </ContainerBox>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleConfirm(facilitadorSelected)}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </ContainerDialog>
    </>
  )
}
