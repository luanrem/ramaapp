import Admin from "../../layouts/Admin";
import api from "../../services/api";

import { Container } from '../../styles/pages/admin/dashboard';

function Dashboard({ authData }) {
  console.log('data', authData)

  return (
    <Container>
      <div>
        <h1>Dashboard</h1>
      </div>
    </Container>
  )
}

Dashboard.layout = Admin;

export async function getServerSideProps(context) {

  const logInfo = {
    identifier: 'camilacvberti@gmail.com',
    password: 'camilacvberti'
  }

  const login = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/local`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logInfo)
  }) 

  // const response = await api.post(`auth/local`, {
  //   identifier: 'camilacvberti@gmail.com',
  //   password: 'camilacvberti'
  // })

  const loginResponse = await login.json()

  return {
    props: {
      authData: loginResponse
    }
  };
}

export default Dashboard;