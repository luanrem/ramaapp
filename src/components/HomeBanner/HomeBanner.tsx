import React, { ReactElement } from 'react'
import { Container } from '../../styles/components/HomeBanner'

interface HomeBannerDTO {
  children?: ReactElement
  height?: number
  imgURL?: string
  className?: string
}

export default function HomeBanner({
  children,
  height,
  imgURL,
  ...rest
}: HomeBannerDTO) {
  return (
    <Container bannerHeight={height} backgroundImage={imgURL} {...rest}>
      {children}
    </Container>
  )
}
