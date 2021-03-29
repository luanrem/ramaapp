import GlobalStyle from "../styles/GlobalStyle";

import AppProvider from '../hooks'
import Router from "next/router";
import { parseCookies } from "nookies";
export default function MyApp({ Component, pageProps}) {

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <AppProvider>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    )
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

  if (!jwt || jwt === undefined) {
    if(ctx.pathname.indexOf("/admin") >= 0) {
      redirectUser(ctx, "/auth/signin")
    }
  }

  return { pageProps }
}

