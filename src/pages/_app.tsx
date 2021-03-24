import GlobalStyle from "../styles/GlobalStyle";
import App from 'next/app';

import { AuthProvider } from '../hooks/auth'
import Router from "next/router";
import { parseCookies } from "nookies";
export default class MyApp extends App {

  render() {
    const { Component }: any = this.props;
    const { pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <AuthProvider>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    )
  }
}

function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.setHeader('Location', location);
    ctx.res.statusCode = 302;
  } else {
    Router.push(location);
  }
}


MyApp.getInitialProps = async ({Component, ctx}) => {
  let pageProps = {}

  const jwt = parseCookies(ctx).jwt;

  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!jwt) {
    if(ctx.pathname.indexOf("/admin") >= 0) {
      redirectUser(ctx, "/auth/signin")
    }
  }

  return { pageProps }
}