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

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName
}) {
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
          <IconButton>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </Container>
  )
}
