import {
  Container,
  Content
} from '../../../../styles/pages/admin/facilitacao/groups'
import Facilitacao from '../../../../layouts/facilitacao'
import Admin from '../../../../layouts/Admin'

// import { Container } from './styles';

function Groups() {
  // const [data, setData] = useState({ username: 'luan' })

  return (
    <Facilitacao>
      <Container>
        <Content>
          <div>Groups</div>
        </Content>
      </Container>
    </Facilitacao>
  )
}

Groups.layout = Admin

export default Groups
