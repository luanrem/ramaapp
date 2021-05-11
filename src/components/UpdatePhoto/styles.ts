import { motion } from 'framer-motion'

import styled from 'styled-components'

export const Container = styled(motion.div)`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(10px);

  display: flex;
  justify-content: center;
  align-items: center;

  .closeIcon {
    place-self: flex-end;
  }

  .card {
    width: 400px;
    height: auto;
    background: white;
    border-radius: 14px;
    box-shadow: 2px 0 5px;
    z-index: -2;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 1.5rem;
  }

  .avatar {
    width: 15rem;
    height: 15rem;
    margin-bottom: 1rem;
  }

  .selectImageButton {
    width: 20rem;
  }
`
export const SecondButtons = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .secondButtons {
    width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }

    box-shadow: none;

    &:first-child {
      background: linear-gradient(267.79deg, #a12839 0%, #a12839 99.18%);
    }

    &:last-child {
      background: linear-gradient(267.79deg, #149414 0%, #149414 99.18%);
    }
  }
`
