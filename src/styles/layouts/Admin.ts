import styled, { css } from 'styled-components'

import { maxWidthContainer, sideBarWidth } from '../../config/stylesconfig'

interface PageContentProps {
  isMobile: boolean
}

export const Container = styled.div``

export const Content = styled.div`
  max-width: ${maxWidthContainer};
  margin: 0 auto;
  margin-top: 1rem;
  padding: 0 0 0 1rem;
  display: flex;
`

export const PageContent = styled.section<PageContentProps>`
  width: calc(100% - ${sideBarWidth} - 2rem);
  flex-grow: 0;

  ${props =>
    props.isMobile
      ? css`
          margin: 0 1rem 0 0;
          width: 100%;
        `
      : css`
          margin: 0 1rem 0 auto;
        `}
`
