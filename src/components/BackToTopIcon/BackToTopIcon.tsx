import { useEffect, useState, useCallback } from 'react'
import { IconButton } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import { useWindowScroll } from 'react-use'

import { Container } from '../../styles/components/BackToTopIcon'

interface paramsDTO {
  showBelow: number
}

export default function BackToTopIcon({ showBelow }: paramsDTO) {
  const { y } = useWindowScroll()
  const [show, setShow] = useState(!showBelow)

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: `smooth` })
  }, [])

  const handleScroll = useCallback(() => {
    if (y > showBelow) {
      if (!show) setShow(true)
    } else {
      if (show) setShow(false)
    }
  }, [showBelow, y])

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll)
      return () => window.removeEventListener(`scroll`, handleScroll)
    }
  })

  return (
    <>
      {show && (
        <Container
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18
          }}
        >
          <IconButton onClick={handleClick}>
            <ExpandLessIcon />
          </IconButton>
        </Container>
      )}
    </>
  )
}
