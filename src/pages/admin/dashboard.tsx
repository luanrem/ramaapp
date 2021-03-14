import Admin from "../../layouts/Admin";

import { Container } from '../../styles/pages/admin/dashboard';

function Dashboard() {
  return (
    <Container>
      <div>
        <h1>Dashboard</h1>
      </div>
    </Container>
  )
}

Dashboard.layout = Admin;

export default Dashboard;