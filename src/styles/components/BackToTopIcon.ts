import styled from 'styled-components'

import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
  z-index: 2;
  position: fixed;
  bottom: 3%;
  right: 3%;
  background: var(--white);
  border-radius: 50%;
  border: 3px solid gray;

  &:hover {
    border-color: var(--blue-dark);
    transition: 0.5s;
  }

  button:hover {
    color: var(--blue-dark);
    transition: 0.5s;
  }
`
