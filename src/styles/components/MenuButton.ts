import styled, { css } from 'styled-components'

import { motion } from 'framer-motion'

interface ContainerProps {
  isActive: boolean
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 2.5rem;

  margin: 1rem 0;

  display: grid;
  grid-template-columns: 30% 70% 1%;
  gap: 2rem;
  align-items: center;

  color: var(--gray-line);

  span {
    justify-self: end;
  }

  h2 {
    justify-self: start;
    font-size: 1.1rem;

    ${props =>
      props.isActive &&
      css`
        color: var(--blue);
      `}
  }
`

export const Slide = styled(motion.div)`
  justify-self: start;
  position: relative;
  right: 15rem;

  border-radius: 30px 0 0 30px;

  width: 12rem;
  height: 100%;
  background: var(--background);

  z-index: -1;
`
