import styled, { css } from 'styled-components'

interface ContainerProps {
  bannerHeight: number | string
  backgroundImage: string
}

export const Container = styled.div<ContainerProps>`
  ${props =>
    props.backgroundImage &&
    css`
      background-image: url(${props.backgroundImage});
    `}

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${props =>
    props.bannerHeight
      ? css`
          height: ${props.bannerHeight}px;
        `
      : css`
          height: auto;
        `}

  width: 100vw;
  max-width: 2000px;
  margin: 0px auto;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`
