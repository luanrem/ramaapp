import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

interface DialogConfirmationProps {
  handleConfirm: (string) => void
  handleCancel: () => void
  open: boolean
  titleText: string
  commentText: string
}

export default function DialogConfirmation(props: DialogConfirmationProps) {
  const { handleConfirm, handleCancel, open, titleText, commentText } = props

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText>{commentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
