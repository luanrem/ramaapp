import { Toolbar } from '@material-ui/core'
import styled, { css } from 'styled-components'

interface ContainerProps {
  isFilled: boolean
}

export const Container = styled(Toolbar)<ContainerProps>`
  height: 3rem;
  display: flex;
  justify-content: space-between;

  ${props =>
    props.isFilled &&
    css`
      button {
        background-color: #f44336;
        color: rgba(0, 0, 0, 0.87);
      }
    `}
`
