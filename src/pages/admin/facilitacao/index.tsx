export default function facilitacao({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>)

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
