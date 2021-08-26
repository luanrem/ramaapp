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

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit'

import { Container } from './styles'

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

function AdminUsers() {
  const [data, setData] = useState({ username: 'luan' })
  const [usersList, setUsersList] = useState<UserListFormat[]>()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [userOpenEdit, setOpenEdit] = useState(false)

  useEffect(() => {
    api.get(`users/me`).then(response => {
      setData(response.data)
      // console.log(response.data)
    })

    // api.get('users').then(response => {
    //   setUsersList(response.data)
    //   console.log(response.data)
    // })
  }, [setData])

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

  return (
    <Container>
      <Card>
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
              {usersList &&
                usersList.map(row => {
                  console.log('row username', row)
                  const group = row.grupo ? row.grupo : 'SEM GRUPO'
                  const userFunction = row.function
                    ? row.function
                    : 'SEM FUNÇÃO'
                  return (
                    <TableRow hover key={row.id}>
                      <TableCell>
                        <Checkbox />
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
