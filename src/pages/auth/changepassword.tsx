import { useCallback, useRef, useState } from 'react'
import {
  Container,
  Content,
  AnimationContainer,
  Background
} from '../../styles/pages/auth/changepassword'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { motion } from 'framer-motion'

import Link from 'next/link'
import Router from 'next/router'
import { useAuth } from '../../hooks/auth'

import Input from '../../components/Input/Input'
import ButtonComponent from '../../components/Button/Button'

import { FiLock, FiMail } from 'react-icons/fi'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/toast'
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon'
// import { parseCookies } from 'nookies'

interface SignUpFormData {
  email: string
  password: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePassword() {
  const formRef = useRef<FormHandles>(null)
  const [entering, setEntering] = useState(false)

  const { changePassword } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      console.log('formulario', data)
      setEntering(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('Digite um e-mail valido'),
          password: Yup.string().required('Senha anterior obrigatória'),
          newPassword: Yup.string()
            .required('Senha anterior obrigatória')
            .min(6, 'Minimo 6 digitos'),
          confirmPassword: Yup.string()
            .required('Senha anterior obrigatória')
            .oneOf([Yup.ref('newPassword'), null], 'As senhas não são iguais')
            .min(6, 'Minimo 6 digitos')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await changePassword({
          email: data.email,
          password: data.password,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword
        })

        Router.push('/admin/dashboard')

        addToast({
          type: 'success',
          title: 'Senha foi atualizada com sucesso',
          description: ''
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          setEntering(false)
          return
        }

        setEntering(false)
        addToast({
          type: 'error',
          title: 'Erro ao atualizar senha',
          description:
            'Ocorreu um erro ao atualizar sua senha, cheque as credenciais.'
        })
      }
    },
    [changePassword]
  )

  // useEffect(() => {
  //   const { jwt, user, menus } = parseCookies()

  //   if (jwt && user && menus) {
  //     Router.push('/admin/dashboard')
  //   }
  // }, [])

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Altere sua senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} placeholder="Senha Antiga" />

            <Input
              name="newPassword"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              name="confirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Confirmar Senha"
            />

            <ButtonComponent type="submit">
              {entering === true ? (
                <motion.div>
                  <LoadingIcon />
                </motion.div>
              ) : (
                'Cadastrar'
              )}
            </ButtonComponent>
          </Form>

          <Link href="/auth/signin">Voltar para pagina</Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}
