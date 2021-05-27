import styled, { keyframes } from 'styled-components'

import { shade } from 'polished'

import signUpBackgroundImg from '../../../assets/images/sign-up-background.jpg'

export const Container = styled.div`
  /* background: url(${signUpBackgroundImg}) no-repeat center; */
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  background: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 80%;
  max-width: 700px;
`

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  img {
    width: 15rem;
  }

  form {
    margin: 3rem 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 2rem;
      color: var(--text);
    }

    a {
      color: var(--blue-dark);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#F4EDE8')};
      }
    }
  }

  > a {
    color: #002bc3;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#002BC3')};
    }
  }

  .googleImg {
    padding-top: 0.5rem;
    width: 10rem;
    img {
      width: 100%;
      transition: 0.3s;
    }
  }

  .googleImg img:hover {
    filter: contrast(80%);
  }
`

export const Background = styled.div`
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`
