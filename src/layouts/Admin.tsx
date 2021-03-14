import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import Sidebar from '../components/Sidebar/Sidebar';

import Hidden from '@material-ui/core/Hidden';

import BackToTopIcon from '../components/BackToTopIcon/BackToTopIcon';

import { Container, Content, PageContent } from '../styles/layouts/Admin';

export default function Admin({ children, ...rest }) {

  return (
    <Container >
      <AdminNavbar />
      <Content>

        <Hidden smDown>
          <Sidebar />
          <PageContent isMobile={false}>
            {children}
          </PageContent>
          <BackToTopIcon showBelow={80} />
        </Hidden>

        <Hidden mdUp>
          <PageContent isMobile={true}>
            {children}
          </PageContent>
          <BackToTopIcon showBelow={80} />
        </Hidden>

      </Content>
    </Container>
  )
}