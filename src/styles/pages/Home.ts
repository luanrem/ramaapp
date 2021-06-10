import styled from 'styled-components'

import { motion } from 'framer-motion'

interface HeaderProps {
  headerBackground: boolean
}

export const Container = styled.div`
  background: var(--blue-twitter);

  .vertialSpace {
    height: 2100px;
  }
`
export const Header = styled.header<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 50px;
  max-width: 2000px;
  z-index: 1;

  margin: 0 auto;
  transition: 0.5s;
  background: ${props =>
    props.headerBackground === true ? 'white' : 'transparent'};
  box-shadow: ${props =>
    props.headerBackground === true ? '0 1px 3px black' : 'none'};

  ul {
    display: flex;

    list-style: none;
    font-size: 18px;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    transition: 0.3s;
    color: ${props => (props.headerBackground === true ? 'black' : 'white')};

    li {
      display: inline-block;
      padding: 0px 20px;
      cursor: pointer;
    }
    a {
      text-decoration: none;
      color: inherit;
    }

    li a::after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      background: black;
      background: ${props =>
        props.headerBackground === true ? 'black' : 'white'};
      transition: width 0.4s;
    }

    li a:hover::after {
      width: 100%;
      transition: width 0.4s;
    }
  }
`
export const MotionHeaderMenu = styled(motion.div)``
