
import { Container, Content, AnimationContainer, Background } from '../../styles/pages/auth/signin';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/images/logo.gif';
import googleImg from '../../assets/images/google_signin.png';
import React, { useCallback, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input/Input';
import ButtonComponent from '../../components/Button/Button';

import { FiLock, FiMail } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Digite um e-mail valido'),
        password: Yup.string().required('Senha Obrigatoria'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })
      
      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  }, [])

  const handleGoogleSignIn = useCallback(async () => {
    console.log("Funcionou");
  }, [])


  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <ButtonComponent type="submit">Entrar</ButtonComponent>

              <a onClick={handleGoogleSignIn} className="googleImg">
                <img src={googleImg} alt="googleSignin"/>
              </a>

            <Link href="/auth/forgotpassword">Esqueci minha senha</Link>
          </Form>

            <Link href="/auth/signup">
              Criar conta
            </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}