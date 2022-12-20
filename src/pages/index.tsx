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
  FaGithubAlt,
  FaLinkedin,
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
        <h1 className="nomeSite">Company</h1>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.{' '}
              </li>
            </ul>
          </Grid>

          <Grid item md={8} xs={11} className="content">
            <h3>Objetivos a serem alcançados:</h3>
          </Grid>

          <Grid item md={8} xs={11} className="content">
            <h2>Geral:</h2>
            <ul>
              <li>
                ELorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Varius duis at consectetur lorem. Convallis a cras semper auctor
                neque vitae. Nisl rhoncus mattis rhoncus urna neque. Mauris nunc
                congue nisi vitae suscipit tellus mauris a.
              </li>
            </ul>
          </Grid>

          <Grid item md={8} xs={11} className="content">
            <h2>Específicos:</h2>
            <ul>
              <li>
                ELorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua;
              </li>
              <li>Varius duis at consectetur lorem;</li>
              <li>
                Varius duis at consectetur lorem. Convallis a cras semper auctor
                neque vitae. Nisl rhoncus mattis rhoncus urna neque;
              </li>
              <li>
                Maecenas accumsan lacus vel facilisis volutpat est velit egestas
                dui. Libero nunc consequat interdum varius. Aliquam sem et
                tortor consequat id.;
              </li>
              <li>
                Sagittis purus sit amet volutpat consequat mauris nunc congue.
                Duis ut diam quam nulla. Diam vulputate ut pharetra sit. Urna et
                pharetra pharetra massa massa ultricies mi quis hendrerit;
              </li>
              <li>
                Ultricies leo integer malesuada nunc vel risus commodo viverra
                maecenas. Condimentum vitae sapien pellentesque habitant morbi
                tristique senectus;
              </li>
              <li>
                Nunc mattis enim ut tellus elementum sagittis vitae et leo.
                Elementum sagittis vitae et leo duis ut diam quam nulla. Quis
                vel eros donec ac odio tempor.
              </li>
            </ul>
            <p>(Pharetra pharetra massa massa ultricies mi quis hendrerit)</p>
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
                  Justo laoreet sit amet cursus sit amet. Tellus rutrum tellus
                  pellentesque eu tincidunt.
                </li>
                <li>
                  Turpis egestas pretium aenean pharetra magna ac placerat.
                  Congue eu consequat ac felis donec et odio. Tristique magna
                  sit amet purus gravida quis blandit turpis. Enim blandit
                  volutpat maecenas volutpat. Libero enim sed faucibus turpis in
                  eu.
                </li>
                <li>
                  Egestas diam in arcu cursus euismod. Tortor at risus viverra
                  adipiscing at in tellus integer feugiat. Eget nunc scelerisque
                  viverra mauris in aliquam sem. Arcu dictum varius duis at
                  consectetur lorem donec. Auctor elit sed vulputate mi sit.
                  Quis eleifend quam adipiscing vitae proin.
                </li>
                <li>Welcome!</li>
                <li>Company coordination</li>
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
            href="https://www.linkedin.com/in/luanrem"
          >
            <FaLinkedin size={40} />
          </a>
          <a className="social-padding" href="https://github.com/luanrem">
            <FaGithubAlt size={40} />
          </a>
          <a
            className="social-padding"
            href="https://www.instagram.com/luanrem/"
          >
            <FaInstagram size={40} />
          </a>
        </div>

        <span className="text-primary">
          Luan Roberto Estrada Martins &copy;
        </span>
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
