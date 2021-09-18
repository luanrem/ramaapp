import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Switch,
  TextField
} from '@material-ui/core'
import { useEffect } from 'react'
import { Container, UserAccountView, AboutMeView, AddressView } from './styles'

export interface UsersFormat {
  id: number
  avatar_url: string
  nacimento: Date
  username: string
  nome_completo: string
  email: string
  grupo: string
  function: string
  blocked?: boolean | null
  ex_participante?: boolean | null
  endereco: string
  endereco_adicional: string
  cidade: string
  estado: string
  telefone: string
}

interface DataFormat {
  user: UsersFormat
  open: boolean
  handleOpen: (data) => void
}

export default function DialogUserEdit({ user, open, handleOpen }: DataFormat) {
  useEffect(() => {
    console.log('usersonHere', user)
  }, [user])

  const handleClose = () => {
    console.log('user', user)
    handleOpen(false)
  }

  return (
    <Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{user.username}</DialogTitle>
        {user && (
          <DialogContent>
            <UserAccountView>
              <Avatar src={user.avatar_url} />
              <div className="textUserFields">
                <div className="userAndDate">
                  <TextField
                    defaultValue={user.username}
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Usuário"
                    type="text"
                    fullWidth
                  />
                  {user.nacimento ? (
                    <TextField
                      defaultValue={user.nacimento}
                      autoFocus
                      margin="dense"
                      id="nascimento"
                      label="Data Nascimento"
                      type="date"
                      fullWidth
                    />
                  ) : (
                    <TextField
                      defaultValue="1111-11-11"
                      autoFocus
                      margin="dense"
                      id="nascimento"
                      label="Data Nascimento"
                      type="date"
                      fullWidth
                    />
                  )}
                </div>
                <TextField
                  defaultValue={user.nome_completo}
                  autoFocus
                  margin="dense"
                  id="nome_completo"
                  label="Nome Completo"
                  type="text"
                />
                <TextField
                  defaultValue={user.email}
                  autoFocus
                  margin="dense"
                  id="email"
                  label="E-mail"
                  type="email"
                />
              </div>
            </UserAccountView>

            <Divider />

            <AboutMeView>
              <div className="textFields">
                <TextField
                  defaultValue={user.grupo}
                  autoFocus
                  margin="dense"
                  id="group"
                  label="Grupo"
                  type="text"
                />
                <TextField
                  defaultValue={user.function}
                  autoFocus
                  margin="dense"
                  id="function"
                  label="Função"
                  type="text"
                />
              </div>
              <FormControlLabel
                control={
                  <Switch color="secondary" defaultChecked={user.blocked} />
                }
                label="Blocked"
                labelPlacement="top"
              />
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    defaultChecked={user.ex_participante}
                  />
                }
                label="Ex Participante"
                labelPlacement="top"
              />
            </AboutMeView>

            <Divider />

            <AddressView>
              <TextField
                defaultValue={user.endereco}
                autoFocus
                margin="dense"
                id="endereco"
                label="Endereço"
                type="text"
                fullWidth
              />
              <TextField
                defaultValue={user.endereco_adicional}
                autoFocus
                margin="dense"
                id="Adicional"
                label="Adicional"
                type="text"
                fullWidth
              />
              <div className="cityStatePhone">
                <TextField
                  defaultValue={user.cidade}
                  autoFocus
                  margin="dense"
                  id="city"
                  label="Cidade"
                  type="text"
                />
                <TextField
                  defaultValue={user.estado}
                  autoFocus
                  margin="dense"
                  id="state"
                  label="Estado"
                  type="text"
                />
                <TextField
                  value={user.telefone}
                  autoFocus
                  margin="dense"
                  id="phone"
                  label="Telefone"
                  type="tel"
                />
              </div>
            </AddressView>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
