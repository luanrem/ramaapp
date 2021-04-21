import styled, { css } from 'styled-components'

interface ContainerProps {
  percent: number
  padding: number
}

export const Container = styled.div<ContainerProps>`
  hr {
    margin: 0 auto;
  }

  ${props =>
    props.padding &&
    css`
      padding: ${props.padding}rem 0;
    `}

  ${props =>
    props.percent &&
    css`
      width: ${props.percent}%;
    `}
`
