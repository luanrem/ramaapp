
import { Content, Container, Title, MobileHeader } from '../../styles/components/AdminNavbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBarProfile from '../NavBarProfile/NavBarProfile';
import Button from '@material-ui/core/Button'

import Hidden from '@material-ui/core/Hidden';
import Menu from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import DrawerSideBar from '../DrawerSideBar/DrawerSideBar';
import { useCallback, useState } from 'react';

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const HandleOpenDrawer = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Content>
      <Container>

        <Hidden smDown>
          <Title>
            <Button>
              <Link href="/admin/dashboard">
                <h1>MISSÃO RAMA</h1>
              </Link>
            </Button>

            <Button
              size="small"
              onClick={() => router.back()}
            >
              Voltar
            </Button>
          </Title>

          <NavBarProfile />
        </Hidden>

        <Hidden mdUp>
          <MobileHeader>
            <Title>
              <Button>
                <Link href="/admin/dashboard">
                  <h2>MISSÃO RAMA</h2>
                </Link>
              </Button>

            </Title>

            <Button onClick={HandleOpenDrawer}>
              <Menu />
            </Button>

          </MobileHeader>
            <Drawer
              variant="temporary"
              className="drawerPaper"
              anchor="right"
              open={open}
              onClick={HandleOpenDrawer}
            >
              <DrawerSideBar
                setOpen={setOpen}
                open={open}
              />
            </Drawer>
        </Hidden>

      </Container>
    </Content>
  )
}