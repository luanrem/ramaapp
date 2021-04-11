import { useCallback, useRef, useState } from 'react'
import {
  Container,
  Content,
  AnimationContainer,
  Background
} from '../../styles/pages/auth/signup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { motion } from 'framer-motion'

import logoImg from '../../assets/images/logo.gif'
import googleImg from '../../assets/images/google_signin.png'
import Link from 'next/link'
import Router from 'next/router'
import { useAuth } from '../../hooks/auth'

import Input from '../../components/Input/Input'
import ButtonComponent from '../../components/Button/Button'

import { FiLock, FiMail, FiUser } from 'react-icons/fi'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/toast'
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon'

interface SignUpFormData {
  username: string
  name: string
  email: string
  password: string
}

export default function SignUp() {
  const formRef = useRef<FormHandles>(null)
  const [entering, setEntering] = useState(false)

  const { signUp } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      setEntering(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          username: Yup.string().required('Apelido obrigatorio'),
          name: Yup.string().label('Name').required('Nome obrigatorio'),
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('Digite um e-mail valido'),
          password: Yup.string().min(6, 'Minimo 6 digitos')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await signUp({
          username: data.username,
          name: data.name,
          email: data.email,
          password: data.password
        })

        Router.push('/admin/configuracao')

        addToast({
          type: 'success',
          title: 'Voce foi cadastrado com sucesso',
          description: 'Por favor atualize seus dados em Configuração.'
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
          title: 'Erro ao cadastrar',
          description: 'Ocorreu um erro ao se cadastrar, cheque as credenciais.'
        })
      }
    },
    [signUp]
  )

  const handleGoogleSignUp = useCallback(async () => {
    console.log('Funcionou')
  }, [])
  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="username" icon={FiUser} placeholder="Apelido" />
            <Input name="name" icon={FiUser} placeholder="Nome Completo" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
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

            <a onClick={handleGoogleSignUp} className="googleImg">
              <img src={googleImg} alt="googleSignin" />
            </a>
          </Form>

          <Link href="/auth/signin">Voltar para logon</Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}
