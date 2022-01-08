import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel
} from '@material-ui/core'
import { useEffect } from 'react'
import { Container, UserAccountView, AboutMeView, AddressView } from './styles'
import { Form } from '@unform/web'
import UnformTextField from '../UnformTextField/UnformTextField'
import UnformSwitch from '../UnformSwitch/UnformSwitch'
import { useAdmin } from '../../hooks/admin'
import { useToast } from '../../hooks/toast'

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
  const { updateUser } = useAdmin()
  const { addToast } = useToast()

  useEffect(() => {}, [])

  const handleClose = () => {
    console.log('user', user)
    handleOpen(false)
  }

  const handleSubmit = async data => {
    const updatedUser = data
    const currentUser = user

    try {
      // TODO[epic=project] Add the Yup validation
      await updateUser(currentUser, updatedUser)

      addToast({
        type: 'success',
        title: `O usuário ${currentUser.username} foi atualizado com sucesso`,
        description: ''
      })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao atualizar usuario',
        description:
          'Ocorreu um erro ao atualizar o usuario, cheque os dados novamente ou entre em contato com o suporte.'
      })
    }
    handleOpen(false)
  }

  return (
    <Container>
      {user && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">{user.username}</DialogTitle>
            <DialogContent>
              <UserAccountView>
                <Avatar src={user.avatar_url} />
                <div className="textUserFields">
                  <div className="userAndDate">
                    <UnformTextField
                      name="username"
                      defaultValue={user.username}
                      autoFocus
                      margin="dense"
                      id="username"
                      label="Usuário"
                      type="text"
                      fullWidth
                    />
                    {user.nacimento ? (
                      <UnformTextField
                        name="nacimento"
                        defaultValue={user.nacimento}
                        autoFocus
                        margin="dense"
                        id="nascimento"
                        label="Data Nascimento"
                        type="date"
                        fullWidth
                      />
                    ) : (
                      <UnformTextField
                        name="nacimento"
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
                  <UnformTextField
                    name="nome_completo"
                    defaultValue={user.nome_completo}
                    autoFocus
                    margin="dense"
                    id="nome_completo"
                    label="Nome Completo"
                    type="text"
                  />
                  <UnformTextField
                    name="email"
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
                  <UnformTextField
                    name="grupo"
                    defaultValue={user.grupo}
                    autoFocus
                    margin="dense"
                    id="group"
                    label="Grupo"
                    type="text"
                  />
                  <UnformTextField
                    name="function"
                    defaultValue={user.function}
                    autoFocus
                    margin="dense"
                    id="function"
                    label="Função"
                    type="text"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <UnformSwitch
                        name="blocked"
                        color="secondary"
                        defaultChecked={user.blocked}
                      />
                    }
                    label="Blocked"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    control={
                      <UnformSwitch
                        name="ex_participante"
                        color="primary"
                        defaultChecked={user.ex_participante}
                      />
                    }
                    label="Ex Participante"
                    labelPlacement="top"
                  />
                </div>
              </AboutMeView>

              <Divider />

              <AddressView>
                <UnformTextField
                  name="endereco"
                  defaultValue={user.endereco}
                  autoFocus
                  margin="dense"
                  id="endereco"
                  label="Endereço"
                  type="text"
                  fullWidth
                />
                <UnformTextField
                  name="endereco_adicional"
                  defaultValue={user.endereco_adicional}
                  autoFocus
                  margin="dense"
                  id="Adicional"
                  label="Adicional"
                  type="text"
                  fullWidth
                />
                <div className="cityStatePhone">
                  <UnformTextField
                    name="cidade"
                    defaultValue={user.cidade}
                    autoFocus
                    margin="dense"
                    id="city"
                    label="Cidade"
                    type="text"
                  />
                  <UnformTextField
                    name="estado"
                    defaultValue={user.estado}
                    autoFocus
                    margin="dense"
                    id="state"
                    label="Estado"
                    type="text"
                  />
                  <UnformTextField
                    name="telefone"
                    defaultValue={user.telefone}
                    autoFocus
                    margin="dense"
                    id="phone"
                    label="Telefone"
                    type="tel"
                  />
                </div>
              </AddressView>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Atualizar
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Container>
  )
}
