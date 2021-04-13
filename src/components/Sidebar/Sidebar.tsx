import { Container } from '../../styles/components/Sidebar'

import MenuButton from '../MenuButton/MenuButton'

import routes from '../../routes/routes'
import { useAuth } from '../../hooks/auth'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const { menus } = useAuth()
  const [sideMenus, setSideMenus] = useState([])

  useEffect(() => {
    console.log('menus', menus)

    const menusResult = []

    menus.forEach(element => {
      const found = routes.find(e => e.path === element.path)
      if (found && element.Ativo === true) {
        menusResult.push(found)
      }
    })

    setSideMenus(menusResult)
    console.log('resultado', menusResult)
  }, [menus])

  return (
    <Container>
      {sideMenus.map((prop, key) => {
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
