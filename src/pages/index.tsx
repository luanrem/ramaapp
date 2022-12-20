/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useRef, useState } from 'react'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import Input from '../components/Input/Input'
import ButtonComponent from '../components/Button/Button'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
// import * as Yup from 'yup'

import BackToTopIcon from '../components/BackToTopIcon/BackToTopIcon'
import {
  FaFacebookSquare,
  FaYoutube,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa'
import { FiMessageSquare } from 'react-icons/fi'
import logoImg from '../assets/images/logo.gif'

import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import {
  Button,
  ClickAwayListener,
  ListItem,
  ListItemText,
  Paper,
  List,
  Hidden,
  Grid
} from '@material-ui/core'
import Poppers from '@material-ui/core/Popper'
import Link from 'next/link'

import {
  Container,
  Header,
  MotionHeaderMenu,
  Footer,
  QuemSomosNosSection,
  NossaMetaSection,
  ComoParticiparSection,
  FaremosContatoSection,
  GaleriaAtividadesSection
} from '../styles/pages/Home'
import { useWindowScroll } from 'react-use'
import HomeBanner from '../components/HomeBanner/HomeBanner'
import LoadingIcon from '../components/LoadingIcon/LoadingIcon'
import { motion } from 'framer-motion'
import { MdPersonOutline, MdMailOutline } from 'react-icons/md'
import Textarea from '../components/Textarea/Textarea'
import { useToast } from '../hooks/toast'
import getValidationErrors from '../utils/getValidationErrors'
import api from '../services/api'

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function Home({ data, carousel }) {
  const formRef = useRef<FormHandles>(null)
  const [sending, setSending] = useState(false)
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null)
  const { y } = useWindowScroll()
  const { addToast } = useToast()

  const imgArray: Array<string> = [
    'https://picsum.photos/1280/720',
    'https://picsum.photos/1280/720',
    'https://picsum.photos/1280/720',
    'https://picsum.photos/1280/720',
    'https://picsum.photos/1280/720'
  ]

  const handleClickMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setOpenMenu(openMenu ? null : event.currentTarget)
    },
    [openMenu]
  )

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(null)
  }, [setOpenMenu])

  const handleSubmit = useCallback(
    async (data: ContactFormData) => {
      console.log('dados', data)
      setSending(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um e-mail valido'),
          name: Yup.string().required('Nome obrigatorio'),
          phone: Yup.string().required('Telefone obrigatorio'),
          message: Yup.string()
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const result = await api.post(
          'email/contato',
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )

        if (result.statusText === 'OK') {
          addToast({
            type: 'success',
            title: 'Email enviado com sucesso',
            description:
              'O email foi enviado com sucesso, logo a coordenação da Missão Rama entrará em contato.'
          })
        }

        setSending(false)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          setSending(false)
          return
        }

        console.log('err', err)

        setSending(false)
        addToast({
          type: 'error',
          title: 'Erro ao enviar email',
          description:
            'Ocorreu um erro ao entrar em contato, favor tentar mais tarde'
        })
      }
    },
    [sending, setSending]
  )

  return (
    <Container>
      <Header headerBackground={y > 80}>
        <div className="space" />

        <Hidden smDown>
          <ul>
            <li>
              <a href="#QuemSomosNosC">Quem somos nós</a>
            </li>
            <li>
              <a href="#NossaMeta">Nossa Meta</a>
            </li>
            <li>
              <a href="#ComoParticipar">Como Participar</a>
            </li>
            <li>
              <a href="#GaleriaDeAtividades">Galeria de atividades</a>
            </li>
            <li>
              <a href="#Contato">Contato</a>
            </li>
          </ul>
        </Hidden>

        <Button className="VertIcon" onClick={handleClickMenu}>
          <MenuRoundedIcon fontSize="large" />
        </Button>

        <Poppers open={Boolean(openMenu)} anchorEl={openMenu}>
          <MotionHeaderMenu
            initial={{
              scaleY: 0,
              y: -100
            }}
            animate={{
              scaleY: 1,
              y: 0
            }}
            transition={{
              type: 'tween'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <List>
                  <Link href="/auth/signin">
                    <ListItem button onClick={handleCloseMenu}>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </Link>
                  <Link href="/auth/signup">
                    <ListItem button onClick={handleCloseMenu}>
                      <ListItemText primary="Criar Conta" />
                    </ListItem>
                  </Link>
                </List>
              </ClickAwayListener>
            </Paper>
          </MotionHeaderMenu>
        </Poppers>
      </Header>

      {/* <Banner></Banner> */}
      <HomeBanner
        className="HomeBanner"
        height={500}
        imgURL={
          'https://img.olhardigital.com.br/wp-content/uploads/2021/01/iStock-1183329518-1-1322x450.jpg'
        }
      >
        <h1 className="nomeSite">Missão Rama Brasil</h1>
      </HomeBanner>

      <QuemSomosNosSection id="QuemSomosNosC">
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <h1>Quem somos nós</h1>
          </Grid>

          <hr />

          <Grid
            item
            xs={12}
            container
            spacing={0}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={9} md={4} className="image">
              <img src={logoImg} alt="logoImage" />
            </Grid>
            <Grid item xs={9} md={4} className="text">
              <p>
                Somos um grupo de pessoas que dedica suas vidas a realizar um
                Programa de Treinamento para que nos tornemos Cidadãos Cósmicos,
                aperfeiçoando-nos a cada dia, para conquistarmos a
                internalização da Ética Universal
              </p>
            </Grid>
          </Grid>
        </Grid>
      </QuemSomosNosSection>

      <HomeBanner
        height={500}
        imgURL={
          'https://img.olhardigital.com.br/wp-content/uploads/2021/01/iStock-1183329518-1-1322x450.jpg'
        }
      />

      <NossaMetaSection id="NossaMeta">
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <h1>Nossa meta</h1>
          </Grid>

          <hr />

          <Grid item md={8} xs={11} className="content">
            <h2>Âmbito pessoal:</h2>
            <ul>
              <li>
                Conhecimento e o autoconhecimento como meios de alquimiar as
                barreiras ( o que nos tem impedido de amar) que impedem a
                evolução rumo à conquista da consciência positiva;{' '}
              </li>
              <li>Desenvolvimento de habilidades para o viver em harmonia.</li>
            </ul>
          </Grid>

          <Grid item md={8} xs={11} className="content">
            <h3>Objetivos a serem alcançados pelo grupo:</h3>
          </Grid>

          <Grid item md={8} xs={11} className="content">
            <h2>Geral:</h2>
            <ul>
              <li>
                Estabelecimento de uma comunidade compromissada com as regras da
                vida e com a promoção do bem comum, tendo o respeito e o amor
                como metas coletivas. A partir desta conquista, desenvolver
                habilidades para viver em harmonia.
              </li>
            </ul>
          </Grid>

          <Grid item md={8} xs={11} className="content">
            <h2>Específicos:</h2>
            <ul>
              <li>
                Servir de referencial ao meio, tanto de forma grupal, quanto
                individual;
              </li>
              <li>
                Atuar na sociedade, gerando a partir dessas atividades, reflexão
                sobre a vida e tudo o que ela representa;
              </li>
              <li>
                Reunir e organizar o conhecimento necessário para criar uma
                sociedade auto-sustentada;
              </li>
              <li>
                Manter, desenvolver e aprimorar o próprio grupo preparando
                sempre novos Semeadores para servir ao Propósito da
                Confederação, estando sempre recebendo o acréscimo de novos
                participantes;
              </li>
              <li>
                Conquistarmos o contato com outras sociedades extra-terrestres a
                partir da Convivência harmônica entre nós (Encontrem-se e nos
                encontrarão);
              </li>
              <li>
                Investir em experiências em campos mais sutis, em atividades
                transcendentais e paranormais passando a considerar a existência
                multidimensional do Ser;
              </li>
              <li>
                Abrir a possibilidade para uma presença extra-terrestre mais
                efetiva dentro do grupo, quando necessário.
              </li>
            </ul>
            <p>
              (Instruções passados por Charlie Wells em palestra no Projeto Amar
              em 1996)
            </p>
          </Grid>
        </Grid>
      </NossaMetaSection>

      <HomeBanner
        height={500}
        imgURL={
          'https://img.olhardigital.com.br/wp-content/uploads/2021/01/iStock-1183329518-1-1322x450.jpg'
        }
      />

      <ComoParticiparSection id="ComoParticipar">
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <h1>Como participar</h1>
          </Grid>

          <hr />

          <Grid
            item
            container
            spacing={3}
            xs={11}
            alignItems="center"
            justify="center"
          >
            <Grid item md={5} xs={11} className="image">
              <img
                src={
                  'https://img.olhardigital.com.br/wp-content/uploads/2021/01/iStock-1183329518-1-1322x450.jpg'
                }
                alt="ComoParticiparFoto"
              />
            </Grid>

            <Grid item md={7} xs={12} className="text">
              <ul>
                <li>
                  Inicialmente, faz-se necessário ler o livro: "Os Semeadores de
                  Vida" de C.R.P.Wells.
                </li>
                <li>
                  Esse livro contêm um importante histórico de nosso trabalho
                  que se iniciou através do contato dos Seres Extra-terrestres
                  com a família deste autor, e que,depois, se diversificou pelo
                  mundo com grupos utilizando metodologias de trabalho
                  diferentes, mas com o mesmo objetivo. Através desta leitura,
                  você poderá ou não se identificar com o objetivo a ser
                  alcançado. Por este motivo, a leitura se torna fundamental!
                </li>
                <li>
                  O segundo passo é escrever um e-mail para a coordenação
                  falando se seu interesse, através do endereço
                  contato@missaorama.com.br ou envie mensagem para o WhatsApp
                  31.98882.9997. Receberá todas as instruções e será direcionado
                  para um grupo de trabalho em sua cidade.
                </li>
                <li>Seja muito bem-vindo(a)!</li>
                <li>Coordenação Missão Rama Brasil</li>
              </ul>
            </Grid>
          </Grid>

          <hr />
        </Grid>
      </ComoParticiparSection>

      <HomeBanner
        height={500}
        imgURL={
          'https://img.olhardigital.com.br/wp-content/uploads/2021/01/iStock-1183329518-1-1322x450.jpg'
        }
      />

      <GaleriaAtividadesSection>
        <h1>Galeria de atividades</h1>
        <hr />
        <Carousel
          autoPlay
          interval={5000}
          infiniteLoop
          swipeable
          width="80%"
          dynamicHeight
          showThumbs={false}
        >
          {imgArray.map((prop, key) => {
            // console.log(menus);
            return (
              <div key={key}>
                <img src={prop} />
              </div>
            )
          })}
        </Carousel>
      </GaleriaAtividadesSection>

      <HomeBanner
        imgURL={
          'https://img.olhardigital.com.br/wp-content/uploads/2021/01/iStock-1183329518-1-1322x450.jpg'
        }
        height="auto"
      >
        <FaremosContatoSection>
          <h2>Faremos Contato</h2>

          <hr />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={MdPersonOutline} placeholder="Nome *" />
            <Input name="email" icon={MdMailOutline} placeholder="E-mail" />
            <Input name="phone" icon={FaWhatsapp} placeholder="WhatsApp *" />

            <Textarea
              name="message"
              icon={FiMessageSquare}
              placeholder="Insira sua Mensagem"
            />

            <ButtonComponent type="submit">
              {sending === true ? (
                <motion.div>
                  <LoadingIcon />
                </motion.div>
              ) : (
                'Enviar'
              )}
            </ButtonComponent>
          </Form>
        </FaremosContatoSection>
      </HomeBanner>

      <Footer className="completar">
        <div className="iconsLinked">
          <a
            className="social-padding"
            href="https://www.facebook.com/ramabrasil"
          >
            <FaFacebookSquare size={40} />
          </a>
          <a
            className="social-padding"
            href="https://www.youtube.com/channel/UChCB5Kj0wvr-KgmtLUHwhTw"
          >
            <FaYoutube size={40} />
          </a>
          <a
            className="social-padding"
            href="https://www.instagram.com/missaorama"
          >
            <FaInstagram size={40} />
          </a>
        </div>

        <span className="text-primary">Missão Rama do Brasil &copy;</span>
      </Footer>

      <BackToTopIcon showBelow={80} />
    </Container>
  )
}

export async function getStaticProps(context) {
  // let res
  // api.get(`/fotos`, { params: { name: 'index' } }).then(response => {
  //   res = response
  // })

  const indexBackgroundPhotos = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fotos?name=index`,
    {
      method: 'GET'
    }
  )

  const data = await indexBackgroundPhotos.json()

  const indexCarousel = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fotos?name=carousel_index`,
    {
      method: 'GET'
    }
  )

  const carousel = await indexCarousel.json()

  return {
    props: { data, carousel } // will be passed to the page component as props
  }
}
