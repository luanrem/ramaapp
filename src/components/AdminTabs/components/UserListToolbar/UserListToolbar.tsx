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

export default function UserListToolbar({
  numSelected,
  selectedUsers,
  filterName,
  onFilterName
}) {
  const { deleteUser } = useAdmin()
  const { addToast } = useToast()

  const handleDeleteUser = () => {
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
          <IconButton onClick={handleDeleteUser}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </Container>
  )
}
