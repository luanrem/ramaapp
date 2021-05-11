/* eslint-disable camelcase */
import Admin from '../../layouts/Admin'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon'
import Divisor from '../../components/Divisor/Divisor'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import 'react-day-picker/lib/style.css'
import * as Yup from 'yup'
import { useToast } from '../../hooks/toast'
import { format } from 'date-fns'

import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'

import {
  Container,
  Header,
  CardInfo,
  UserForms,
  AboutMe,
  CardProfile,
  AvatarContainer,
  UserContent
} from '../../styles/pages/admin/perfil'
import { useAuth } from '../../hooks/auth'
import { useCallback, useRef, useState } from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { parseCookies } from 'nookies'
import UpdatePhoto from '../../components/UpdatePhoto/UpdatePhoto'

// 0: "xs"
// 1: "sm"
// 2: "md"
// 3: "lg"
// 4: "xl"
// xs: 0
// sm: 600
// md: 960
// lg: 1280
// xl: 1920

interface UserFormData {
  email?: string
  nome_completo?: string
  telefone?: string
  username?: string
  Cidade?: string
  Estado?: string
  Nacimento?: Date
  sobre_mim?: string
  endereco?: string
  endereco_adicional?: string
}

function Perfil({ response: updatedUser }) {
  // console.log('updatedUser', updatedUser)
  const formRef = useRef<FormHandles>(null)
  const [updating, setUpdating] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const { user, updateUser, photoURL } = useAuth()
  const { addToast } = useToast()

  const dateOnChange = useCallback(e => {
    const currentType = e.currentTarget.type
    if (currentType === 'date') e.currentTarget.type = 'text'
    if (currentType === 'text') e.currentTarget.type = 'date'
  }, [])

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      setUpdating(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          username: Yup.string(),
          email: Yup.string().email('Digite um e-mail valido'),
          nome_completo: Yup.string(),
          endereco: Yup.string(),
          endereco_adicional: Yup.string(),
          Cidade: Yup.string(),
          Estado: Yup.string(),
          telefone: Yup.string(),
          sobre_mim: Yup.string()
        })

        await schema.validate(data, {
          abortEarly: false
        })
        console.log('submit')
        console.log(data)

        await updateUser({
          username: data.username,
          email: data.email,
          nome_completo: data.nome_completo,
          Nacimento: data.Nacimento,
          endereco: data.endereco,
          endereco_adicional: data.endereco_adicional,
          Cidade: data.Cidade,
          Estado: data.Estado,
          telefone: data.telefone,
          sobre_mim: data.sobre_mim
        })

        setUpdating(false)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          setUpdating(false)
          return
        }

        setUpdating(false)
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o usuário, cheque os dados.'
        })
      }
    },
    [updateUser]
  )

  return (
    <Container>
      <AnimateSharedLayout type="crossfade">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header>
              {updatedUser.username ? (
                <h2>Olá {updatedUser.username}</h2>
              ) : (
                <h2>Olá</h2>
              )}
              <p>
                Essa é a sua página de perfil, mantenha ela sempre atualizada.
              </p>
            </Header>
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardInfo>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <UserForms container spacing={4}>
                  <Grid item xs={12}>
                    <h3>Informações de Usuário</h3>
                  </Grid>
                  <Grid className="FormInput" item xs={12} sm={4}>
                    <h4>Username</h4>
                    <Input
                      name="username"
                      type="text"
                      placeholder={updatedUser.username}
                    />
                  </Grid>
                  <Grid className="FormInput" item xs={12} sm={8}>
                    <h4>E-Mail</h4>
                    <Input
                      name="email"
                      type="email"
                      placeholder={updatedUser.email}
                    />
                  </Grid>
                  <Grid className="FormInput" item xs={12} sm={8}>
                    <h4>Nome Completo</h4>
                    <Input
                      name="nome_completo"
                      placeholder={updatedUser.nome_completo}
                    />
                  </Grid>
                  <Grid className="FormInput" item xs={12} sm={4}>
                    <h4>Nascimento</h4>
                    <Input
                      name="Nacimento"
                      placeholder={
                        updatedUser.Nacimento
                          ? format(
                              new Date(updatedUser.Nacimento),
                              'dd/MM/yyyy'
                            )
                          : 'dd/mm/aaaa'
                      }
                      onFocus={dateOnChange}
                      onBlur={dateOnChange}
                    />
                  </Grid>
                </UserForms>

                <Grid item xs={12}>
                  <Divisor
                    orientation="horizontal"
                    variant="middle"
                    padding={2}
                  />
                </Grid>

                <UserForms container spacing={4}>
                  <Grid item xs={12}>
                    <h3>Informações de Contato</h3>
                  </Grid>

                  <Grid className="FormInput" item xs={12}>
                    <h4>Endereço</h4>
                    <Input
                      name="endereco"
                      type="text"
                      placeholder={
                        updatedUser.endereco
                          ? updatedUser.endereco
                          : 'Ex: R. Jardins Apu n.1992'
                      }
                    />
                  </Grid>
                  <Grid className="FormInput" item xs={12}>
                    <h4>Adicional</h4>
                    <Input
                      name="endereco_adicional"
                      type="text"
                      placeholder={
                        updatedUser.endereco_adicional
                          ? updatedUser.endereco_adicional
                          : 'Ex: Casa 1, Bl.2 Ap.3'
                      }
                    />
                  </Grid>
                  <Grid className="FormInput" item xs={12} sm={6}>
                    <h4>Cidade</h4>
                    <Input
                      name="Cidade"
                      type="text"
                      placeholder={
                        updatedUser.Cidade
                          ? updatedUser.Cidade
                          : 'Ex: Belo Horizonte'
                      }
                    />
                  </Grid>
                  <Grid className="FormInput" item xs={12} sm={6}>
                    <h4>Estado</h4>
                    <Input
                      name="Estado"
                      type="text"
                      placeholder={
                        updatedUser.Estado
                          ? updatedUser.Estado
                          : 'Ex: Minas Gerais'
                      }
                    />
                  </Grid>

                  <Grid className="FormInput" item xs={12} sm={6}>
                    <h4>Telefone</h4>
                    <Input
                      name="telefone"
                      type="tel"
                      placeholder={
                        updatedUser.telefone
                          ? updatedUser.telefone
                          : '(12) 12345-6789'
                      }
                    />
                  </Grid>
                </UserForms>

                <Divisor
                  orientation="horizontal"
                  variant="middle"
                  padding={2}
                />

                <AboutMe>
                  <Grid item xs={12}>
                    <h4>Sobre mim</h4>
                    <textarea
                      name="sobre_mim"
                      placeholder={
                        updatedUser.sobre_mim
                          ? updatedUser.sobre_mim
                          : 'Insira um texto brevemente explicativo sobre você'
                      }
                    />
                  </Grid>
                </AboutMe>

                <Grid className="SubmitButton" item xs={12}>
                  <Button type="submit">
                    {updating === true ? (
                      <motion.div>
                        <LoadingIcon />
                      </motion.div>
                    ) : (
                      'Atualizar'
                    )}
                  </Button>
                </Grid>
              </Form>
            </CardInfo>
          </Grid>
          <Grid className="ProfileCard" item xs={12} sm={4}>
            <CardProfile>
              <AvatarContainer>
                <Avatar
                  onClick={() => setSelectedId(true)}
                  src={photoURL}
                  alt="Profile Image"
                  className="avatar"
                />
              </AvatarContainer>
              <UserContent>
                <div>
                  <span>
                    {user.grupo.nome_abreviado
                      ? user.grupo.nome_abreviado
                      : 'APU'}
                  </span>
                  <p>Grupo</p>
                </div>
                <div>
                  {user.ex_participante === true ? (
                    <span>Sim</span>
                  ) : (
                    <span>Não</span>
                  )}
                  <p>Ex-Participante</p>
                </div>
              </UserContent>
              {user.nome_completo && (
                <h3>
                  {user.nome_completo}
                  <span>, 27</span>
                </h3>
              )}
              {user.Cidade && (
                <h4 className="Cidade">
                  {user.Cidade}, {user.Estado}
                </h4>
              )}
              {user.funcao && (
                <span className="Funcao">{user.funcao.Funcao}</span>
              )}
              <Divisor
                orientation="horizontal"
                variant="middle"
                padding={2}
                percent={100}
              />
              {user.sobre_mim && <p className="SobreMim">{user.sobre_mim}</p>}
            </CardProfile>
          </Grid>

          <UpdatePhoto selectedId={selectedId} setSelectedId={setSelectedId} />
        </Grid>
      </AnimateSharedLayout>
    </Container>
  )
}

Perfil.layout = Admin

export async function getServerSideProps(context) {
  const jwt = parseCookies(context).jwt

  const login = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  })

  const response = await login.json()

  return {
    props: {
      response
    }
  }
}

export default Perfil
