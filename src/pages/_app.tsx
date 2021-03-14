import GlobalStyle from "../styles/GlobalStyle";
import App from 'next/app';
export default class MyApp extends App {

  render() {
    const { Component }: any = this.props;
    const { pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
  
}

