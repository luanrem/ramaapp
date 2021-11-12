import {
  Box,
  Icon,
  InputAdornment,
  OutlinedInput,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core'
import { Container } from './styles'
import SearchIcon from '@material-ui/icons/Search'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { useAdmin } from '../../../../hooks/admin'
import { useToast } from '../../../../hooks/toast'
import { useState } from 'react'
import DialogConfirmationWithText from '../DialogConfirmationWithText/DialogConfirmationWithText'

export default function UserListToolbar({
  numSelected,
  selectedUsers,
  filterName,
  onFilterName
}) {
  const { deleteUser } = useAdmin()
  const { addToast } = useToast()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [textToConfirm, setTextToConfirm] = useState(
    'Estou ciente que vou deletar estes usuarios'
  )

  const handleConfirmDialog = data => {
    if (data === textToConfirm) {
      handleDeleteUser()
      setTextToConfirm(textToConfirm + ' de novo')
    } else {
      addToast({
        type: 'error',
        title: 'Falha ao remover usuarios',
        description: `O texto digitado não é o mesmo que o escrito acima.`
      })
    }
  }

  const handleCancelDialog = () => {
    setDialogOpen(false)
  }

  const handleDeleteUser = () => {
    setDialogOpen(false)

    try {
      deleteUser(selectedUsers)
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao remover usuarios',
        description: `Houve uma falha ao remover algum usuario, favor tentar novamente`
      })
    }
  }

  return (
    <Container isFilled={!!numSelected}>
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} Selecionados
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Procurar por nome"
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon}>
                <SearchIcon />
              </Box>
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => setDialogOpen(true)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}

      <DialogConfirmationWithText
        handleConfirm={handleConfirmDialog}
        handleCancel={handleCancelDialog}
        open={dialogOpen}
        textToConfirm={textToConfirm}
      />
    </Container>
  )
}
