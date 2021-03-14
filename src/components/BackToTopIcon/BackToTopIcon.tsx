import { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { useCallback } from "react";
import { useWindowScroll } from 'react-use';

interface paramsDTO {
  showBelow: number;
}

import { Container } from '../../styles/components/BackToTopIcon';

export default function BackToTopIcon({ showBelow }: paramsDTO) {
  const { x, y } = useWindowScroll()
  const [show, setShow] = useState(showBelow ? false : true)

  const handleClick = useCallback(() => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  }, []);

  const handleScroll = useCallback(() => {
    if (y > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  }, [showBelow, y]);

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll)
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  })

  return (
    <>
      {show &&
        <Container
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18
          }}
        >
          <IconButton onClick={handleClick}>
            <ExpandLessIcon />
          </IconButton>
        </Container>
      }
    </>
  )
}