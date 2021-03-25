import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import Sidebar from '../components/Sidebar/Sidebar';

import Hidden from '@material-ui/core/Hidden';

import BackToTopIcon from '../components/BackToTopIcon/BackToTopIcon';

import { Container, Content, PageContent } from '../styles/layouts/Admin';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

export default function Admin({ children, ...rest }) {
  // const router = useRouter()

  // useEffect(() => {
  //   const token = parseCookies().jwt;
  //   console.log("token", token)

  //   if(!token) {
  //     router.replace('/auth/signin')
  //   }
  // })

  return (
    <Container >
      <AdminNavbar />
      <Content>

        <Hidden smDown>
          <Sidebar />
          <PageContent isMobile={false}>
            {children}
          </PageContent>
          <BackToTopIcon showBelow={80} />
        </Hidden>

        <Hidden mdUp>
          <PageContent isMobile={true}>
            {children}
          </PageContent>
          <BackToTopIcon showBelow={80} />
        </Hidden>

      </Content>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const jwt = parseCookies(cxt).jwt;
  console.log("JWT", jwt)

  if (!jwt) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    }
  }

  return {
    props: {jwt}
  }
}
