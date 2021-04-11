import { Container } from '../../styles/components/Sidebar'

import MenuButton from '../MenuButton/MenuButton'

import routes from '../../routes/routes'

export default function Sidebar() {
  return (
    <Container>
      {routes.map((prop, key) => {
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
