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
import api from '../../../services/api'
import { filter } from 'lodash'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit'

import { Container } from './styles'
import UserListToolbar from '../components/UserListToolbar/UserListToolbar'
import {
  EnhancedTableHead,
  UserListFormat,
  Order
} from '../components/EnhancedTableHead/EnhancedTableHead'

function AdminUsers() {
  const [usersList, setUsersList] = useState<UserListFormat[]>()
  const [order, setOrder] = useState<Order>('asc') // asc or desc
  const [orderBy, setOrderBy] = useState<keyof UserListFormat>('id') // which field in header
  const [userOpenEdit, setOpenEdit] = useState(false)
  const [selected, setSelected] = useState([])
  const [filterName, setFilterName] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<UserListFormat[]>()

  useEffect(() => {
    api.get('users').then(response => {
      const userList: UserListFormat[] = response.data.map(user => {
        // console.log('userSingle', user)
        const avatar = user.avatar
          ? `${process.env.NEXT_PUBLIC_API_URL}${user.avatar.formats.small.url}`
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
      setUsersList(userList)
      setFilteredUsers(userList)
      console.log('userList', userList)
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

  const handleOpenEdit = usuario => {
    console.log('event', usuario)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleClick = (event, nome_completo) => {
    const selectedIndex = selected.indexOf(nome_completo)
    let newSelected = []
    // selectedIndex === -1 =>  didn't find the user in "selected" so add it
    // selectedIndex === 0 => nobody in "selected" so erase it
    // selectedIndex > 0 => if you are removing some user from "selected"
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nome_completo)
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
    <Container>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
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
                stableSort(filteredUsers, getComparator(order, orderBy)).map(
                  row => {
                    const { id, nome_completo, avatar_url } = row
                    const isItemSelected =
                      selected.indexOf(nome_completo) !== -1
                    const group = row.grupo ? row.grupo : 'SEM GRUPO'
                    const userFunction = row.function
                      ? row.function
                      : 'SEM FUNÇÃO'
                    return (
                      <TableRow
                        hover
                        // onClick={event => handleClick(event, nome_completo)}
                        key={Number(id)}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                      >
                        <TableCell>
                          <Checkbox
                            checked={isItemSelected}
                            onChange={event =>
                              handleClick(event, nome_completo)
                            }
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
                          <Button onClick={() => handleOpenEdit(row.username)}>
                            <EditIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  }
                )}
              <TableRow className="TableFooter">
                Total: {usersList && usersList.length}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={userOpenEdit}
        onClose={handleCloseEdit}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title">Subscribe</DialogTitle>
      </Dialog>
    </Container>
  )
}

export default AdminUsers
