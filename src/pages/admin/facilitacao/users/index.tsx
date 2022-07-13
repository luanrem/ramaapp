/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import api from '../../../../services/api'
import { filter } from 'lodash'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit'

import { Container, Content } from './styles'
import UserListToolbar from '../../../../components/UserListToolbar/UserListToolbar'
import {
  EnhancedTableHead,
  UserListFormat,
  Order
} from '../../../../components/EnhancedTableHead/EnhancedTableHead'
import DialogUserEdit, {
  UsersFormat
} from '../../../../components/DialogUserEdit/DialogUserEdit'

import Facilitacao from '../../../../layouts/facilitacao'
import Admin from '../../../../layouts/Admin'

function Users() {
  // TODO[epic=project] Create add user Function
  const [users, setUsers] = useState<UsersFormat[]>()
  const [userOpenEdit, setUserOpenEdit] = useState(false)
  const [userOpened, setUserOpened] = useState<UsersFormat>(null)
  const [usersList, setUsersList] = useState<UserListFormat[]>()
  const [order, setOrder] = useState<Order>('asc') // asc or desc
  const [orderBy, setOrderBy] = useState<keyof UserListFormat>('id') // which field in header
  const [selected, setSelected] = useState([])
  const [filterName, setFilterName] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<UserListFormat[]>()

  useEffect(() => {
    // TODO[epic=project] Create a function to update the list without reload
    api.get('users').then(response => {
      const userList: UserListFormat[] = response.data.map(user => {
        // console.log('userSingle', user)
        const avatar = user.avatar
          ? `${process.env.NEXT_PUBLIC_API_URL}${user.avatar.url.substring(1)}`
          : null
        const funcao = user.funcao ? user.funcao.Funcao : null
        const group = user.grupo ? user.grupo.nome_abreviado : null
        return {
          id: user.id,
          avatar_url: avatar,
          username: user.username,
          nome_completo: user.nome_completo,
          blocked: user.blocked,
          grupo: group,
          function: funcao
        }
      })
      const usersCompletedList: UsersFormat[] = response.data.map(user => {
        // console.log('userSingle', user)
        const avatar = user.avatar
          ? `${process.env.NEXT_PUBLIC_API_URL}${user.avatar.url.substring(1)}`
          : null
        const funcao = user.funcao ? user.funcao.Funcao : null
        const group = user.grupo ? user.grupo.nome : null
        return {
          id: user.id,
          avatar_url: avatar,
          username: user.username,
          nome_completo: user.nome_completo,
          blocked: user.blocked,
          grupo: group,
          function: funcao,
          nacimento: user.Nacimento,
          email: user.email,
          ex_participante: user.ex_participante,
          endereco: user.endereco,
          endereco_adicional: user.endereco_adicional,
          cidade: user.Cidade,
          estado: user.Estado,
          telefone: user.telefone
        }
      })
      setUsers(usersCompletedList)
      setUsersList(userList)
      setFilteredUsers(userList)
      // console.log('userList', response.data)
    })
  }, [])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof UserListFormat
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleOpenEdit = userId => {
    // console.log('event', userId)
    const foundUser = users.find(element => element.id === userId)
    // console.log('foundUser', foundUser)
    setUserOpened(foundUser)
    setUserOpenEdit(true)
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    // selectedIndex === -1 =>  didn't find the user in "selected" so add it
    // selectedIndex === 0 => nobody in "selected" so erase it
    // selectedIndex > 0 => if you are removing some user from "selected"
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleFilterByName = event => {
    setFilterName(event.target.value)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map(n => n.nome_completo)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  useEffect(() => {
    if (usersList && filterName) {
      const filtered = filter(usersList, usersList =>
        usersList.nome_completo
          ? usersList.nome_completo
              .toLowerCase()
              .indexOf(filterName.toLowerCase()) !== -1
          : null
      )
      setFilteredUsers(filtered)
    }
    if (filterName === '') {
      setFilteredUsers(usersList)
    }
  }, [filterName, usersList])

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function getComparator<Key extends string>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string | boolean }
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }

  return (
    <Facilitacao>
      <Content>
        <Container>
          <Card>
            <UserListToolbar
              numSelected={selected.length}
              selectedUsers={selected}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
            <Divider />
            <TableContainer>
              <Table>
                {filteredUsers && (
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={filteredUsers.length}
                  />
                )}
                <TableBody>
                  {filteredUsers &&
                    stableSort(
                      filteredUsers,
                      getComparator(order, orderBy)
                    ).map(row => {
                      const { id, nome_completo, avatar_url } = row
                      const isItemSelected = selected.indexOf(id) !== -1
                      const group = row.grupo ? row.grupo : 'SEM GRUPO'
                      const userFunction = row.function
                        ? row.function
                        : 'SEM FUNÇÃO'
                      return (
                        <TableRow
                          hover
                          // onClick={event => handleClick(event, Number(id))}
                          key={Number(id)}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                        >
                          <TableCell>
                            <Checkbox
                              checked={isItemSelected}
                              onChange={event => handleClick(event, Number(id))}
                            />
                          </TableCell>
                          <TableCell>
                            <Avatar
                              alt={String(nome_completo)}
                              src={String(avatar_url)}
                            />
                          </TableCell>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell>{row.nome_completo}</TableCell>
                          <TableCell>{group}</TableCell>
                          <TableCell>
                            {row.blocked ? (
                              <HighlightOffIcon color="error" />
                            ) : (
                              <CheckCircleOutlineIcon color="primary" />
                            )}
                          </TableCell>
                          <TableCell>{userFunction}</TableCell>
                          <TableCell>
                            <Button onClick={() => handleOpenEdit(id)}>
                              <EditIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  <TableRow className="TableFooter">
                    Total: {usersList && usersList.length}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <DialogUserEdit
            user={userOpened}
            open={userOpenEdit}
            handleOpen={setUserOpenEdit}
          />
        </Container>
      </Content>
    </Facilitacao>
  )
}

Users.layout = Admin

export default Users
