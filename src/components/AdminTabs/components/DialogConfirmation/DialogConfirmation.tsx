import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core'
import { useRef } from 'react'

interface DialogConfirmationProps {
  handleConfirm: (string) => void
  handleCancel: () => void
  open: boolean
  textToConfirm: string
}

export default function DialogConfirmation(props: DialogConfirmationProps) {
  const { handleConfirm, handleCancel, open, textToConfirm } = props
  const inputEl = useRef(null)

  const handleClickConfirm = () => {
    // console.log('text', inputEl.current.children[1].children[0].value)
    handleConfirm(inputEl.current.children[1].children[0].value)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Tem certeza que vai deletar?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Percebi que você está tentando deletar alguns usuários. Então para
            confirmar, copie o texto que está escrito abaixo:
          </DialogContentText>
          <h4>{textToConfirm}</h4>
          <TextField
            ref={inputEl}
            autoFocus
            margin="dense"
            id="name"
            label="Texto a ser copiado"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClickConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
