import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import React, { useState } from 'react'

import { ContainerDialog, ContainerBox } from './styles'

interface DialogSelectUserProps {
  handleConfirm: (string) => void
  handleCancel: () => void
  open: boolean
  titleText: string
  commentText: string
}

export default function DialogSelectUser(props: DialogSelectUserProps) {
  const { handleConfirm, handleCancel, open, titleText, commentText } = props
  const [facilitadorSelected, setFacilitadorSelected] = useState<DialogProps>()

  const handleFacilitadorSelectedChange = event => {
    console.log('Chegou aqui', event.target)
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
              <MenuItem value="Luan">Luan</MenuItem>
              <MenuItem value="Camila">Camila</MenuItem>
              <MenuItem value="Teste">Teste</MenuItem>
              <MenuItem value="Catia">Catia</MenuItem>
              <MenuItem value="Cristina">Cristina</MenuItem>
            </Select>
          </FormControl>
        </ContainerBox>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </ContainerDialog>
    </>
  )
}
