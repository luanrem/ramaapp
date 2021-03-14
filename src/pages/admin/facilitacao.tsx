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

export default Facilitacao;