/* eslint-disable camelcase */
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { filter } from 'lodash'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit'

import { Container } from './styles'
import UserListToolbar from '../components/UserListToolbar/UserListToolbar'

const TABLE_HEAD = [
  { id: 'avatar', label: 'Avatar' },
  { id: 'id', label: 'Id' },
  { id: 'user', label: 'Usuário' },
  { id: 'nome', label: 'Nome ' },
  { id: 'group', label: 'Grupo' },
  { id: 'active', label: 'Ativo' },
  { id: 'function', label: 'Função' },
  { id: 'edit', label: '' }
]

interface UserListFormat {
  id: number
  avatar_url: string
  username: string
  nome_completo?: string
  blocked: boolean
  grupo: string
  function: string
}

// ===========================================

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function AdminUsers() {
  // const [data, setData] = useState({ username: 'luan' })
  const [usersList, setUsersList] = useState<UserListFormat[]>()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [userOpenEdit, setOpenEdit] = useState(false)
  const [selected, setSelected] = useState([])
  const [filterName, setFilterName] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  // useEffect(() => {
  //   api.get(`users/me`).then(response => {
  //     setData(response.data)
  //     // console.log(response.data)
  //   })

  //   // api.get('users').then(response => {
  //   //   setUsersList(response.data)
  //   //   console.log(response.data)
  //   // })
  // }, [setData])

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

  // const handleRequestSort = prop => {
  //   const isAsc = orderBy === prop && order === 'asc'
  //   setOrder(isAsc ? 'desc' : 'asc')
  //   setOrderBy(prop)
  // }

  const handleOpenEdit = () => {
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

  // applySortFilter()

  return (
    <Container>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                {TABLE_HEAD.map(headCell => (
                  <TableCell key={headCell.id}>
                    <TableSortLabel
                    // active={orderBy === headCell.id}
                    // direction={orderBy === headCell.id ? order : 'asc'}
                    // onClick={handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers &&
                filteredUsers.map(row => {
                  const { nome_completo } = row
                  const isItemSelected = selected.indexOf(nome_completo) !== -1
                  const group = row.grupo ? row.grupo : 'SEM GRUPO'
                  const userFunction = row.function
                    ? row.function
                    : 'SEM FUNÇÃO'
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <Checkbox
                          checked={isItemSelected}
                          onChange={event => handleClick(event, nome_completo)}
                        />
                      </TableCell>
                      <TableCell>
                        <Avatar alt={row.nome_completo} src={row.avatar_url} />
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
                        <Button onClick={handleOpenEdit}>
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              <TableRow>
                <TableCell>
                  <div>Body</div>
                </TableCell>
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
