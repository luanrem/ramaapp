import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Admin from "../../layouts/Admin";

function Atas({jwt}) {
  console.log("jwt",jwt);
  return (
    <div>Atas</div>
  )
}

Atas.layout = Admin;

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

export default Atas;