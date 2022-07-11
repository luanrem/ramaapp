import { Container } from '../../styles/components/Sidebar'

import MenuButton from '../MenuButton/MenuButton'

import { useAuth } from '../../hooks/auth'

export default function Sidebar() {
  const { menus } = useAuth()

  return (
    <Container>
      {menus &&
        menus.map((prop, key) => {
          // console.log(menus);
          return (
            <MenuButton
              key={key}
              layout={prop.layout}
              path={prop.path}
              name={prop.name}
              icon={prop.icon}
            />
          )
        })}
      <div className="space" />
      <MenuButton
        layout="/admin"
        path="/configuracao"
        name="Configuração"
        icon="settings"
      />
    </Container>
  )
}
