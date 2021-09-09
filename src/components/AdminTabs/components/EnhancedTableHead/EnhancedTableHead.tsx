import React from 'react'

import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core'

export interface UserListFormat {
  id: number
  avatar_url: string
  username: string
  nome_completo: string
  blocked: boolean
  grupo: string
  function: string
  edit: string
}

interface HeadCell {
  id: keyof UserListFormat
  label: string
}

const TABLE_HEAD: HeadCell[] = [
  { id: 'avatar_url', label: 'Avatar' },
  { id: 'id', label: 'Id' },
  { id: 'username', label: 'Usuário' },
  { id: 'nome_completo', label: 'Nome ' },
  { id: 'grupo', label: 'Grupo' },
  { id: 'blocked', label: 'Ativo' },
  { id: 'function', label: 'Função' },
  { id: 'edit', label: '' }
]

export type Order = 'asc' | 'desc'

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof UserListFormat
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props

  const createSortHandler = (property: keyof UserListFormat) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {TABLE_HEAD.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : 'asc'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
