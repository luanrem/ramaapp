import { parseCookies } from "nookies";
import Admin from "../../layouts/Admin";

import { Container } from '../../styles/pages/admin/facilitacao';

function Facilitacao() {
  return (
    <Container>
      <div>
        <h1>Administração</h1>
      </div>
    </Container>
  )
}

Facilitacao.layout = Admin;

export async function getServerSideProps(context) {
  const jwt = parseCookies(context).jwt

  return {
    props: {}
  }

}

export default Facilitacao;

