import styled from 'styled-components'

import { motion } from 'framer-motion'

interface HeaderProps {
  headerBackground: boolean
}

export const Container = styled.div`
  background: var(--background);

  .HomeBanner {
    h1 {
      font-family: GoodTimes;
      font-size: 70px;
      color: white;
    }
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

  .VertIcon span {
    color: ${props => (props.headerBackground === true ? 'black' : 'white')};
  }

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

export const Banner = styled.div`
  width: 100vw;
  max-width: 2000px;
  margin: 0px auto;

  h1 {
    font-family: GoodTimes;
    font-size: 70px;
    color: white;
  }
`

export const Footer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 30px;
  max-width: 2000px;

  padding: 50px 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .iconsLinked {
    padding: 20px 0;
    a {
      text-decoration: none;
      color: #222;
      margin: 15px;
    }
  }
`

export const QuemSomosNosSection = styled.div`
  font-family: Georgia, 'Times New Roman', Times, serif;
  padding: 50px 0;

  hr {
    display: block;
    height: 4px;
    border-width: 0;
    color: #eee;
    background-color: rgba(199, 199, 199, 1);
    width: 650px;

    max-width: 50px;
    margin-top: 25px;
    margin-bottom: 20px;
  }

  h1 {
    font-weight: 500;
  }

  img {
    max-width: 300px;
    height: auto;
  }

  .image {
    text-align: center;
  }

  p {
    max-width: 400px;
    font-size: 20px;
    line-height: 1.5;
    color: #696969;
  }
  @media (max-width: 960px) {
    .text {
      padding-top: 30px;
      text-align: -webkit-center;
      text-align: center;
    }
    img {
      max-width: 200px;
    }
  }
`
export const NossaMetaSection = styled.div`
  font-family: Georgia, 'Times New Roman', Times, serif;
  padding: 50px 0;

  hr {
    display: block;
    height: 4px;
    border-width: 0;
    color: #eee;
    background-color: rgba(199, 199, 199, 1);
    width: 650px;

    max-width: 50px;
    margin-top: 25px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 23px;
    line-height: 1.5;
  }

  h3 {
    font-size: 23px;
    padding: 15px;
    padding-top: 25px;
  }

  ul {
    list-style-type: none;
    li {
      max-width: 800px;
      margin-left: 15px;
      font-size: 20px;
      line-height: 1.5;
      color: #696969;
    }
  }

  @media (max-width: 960px) {
    h2 {
      text-align: -webkit-center;
    }
  }
`

export const ComoParticiparSection = styled.div`
  font-family: Georgia, 'Times New Roman', Times, serif;
  padding: 50px 0;

  hr {
    display: block;
    height: 4px;
    border-width: 0;
    color: #eee;
    background-color: rgba(199, 199, 199, 1);
    width: 650px;

    max-width: 50px;
    margin-top: 25px;
    margin-bottom: 20px;
  }

  .image {
    text-align: center;
  }

  img {
    max-height: 300px;
    max-width: 100%;
    margin-right: 20px;
    border-radius: 10px;
  }

  ul {
    list-style-type: none;

    li {
      max-width: 100%;
      margin-left: 15px;
      font-size: 20px;
      line-height: 1.5;
      color: #696969;
    }
  }

  @media (max-width: 960px) {
    .text {
      padding-top: 30px;
      text-align: -webkit-center;
    }
  }
`
export const FaremosContatoSection = styled.div`
  width: auto;
  height: auto;
  background: white;
  border-radius: 10px;
  margin: 3rem 0;

  h2 {
    font-family: GoodTimes;
    font-size: 30px;
    color: black;
    padding: 20px 100px;
    margin: 0 auto;
  }

  hr {
    display: block;
    height: 4px;
    border-width: 0;
    color: #eee;
    background-color: rgba(199, 199, 199, 1);
    width: 650px;
    margin: 0 auto;

    max-width: 50px;
    margin-top: 25px;
    margin-bottom: 1px;
  }

  textarea {
    width: 100%;
    height: auto;
    margin-top: 0.8rem;

    border-radius: 10px;
    background: var(--background);
    border: 1px solid var(--text);
    padding: 0.5rem;

    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 16px;
    resize: vertical;
  }

  form {
    padding: 20px 0;
    margin: 0 auto;
    width: 80%;
  }
`
export const GaleriaAtividadesSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: Georgia, 'Times New Roman', Times, serif;
  padding: 50px 0;

  h1 {
    font-weight: 500;
  }

  hr {
    display: block;
    height: 4px;
    border-width: 0;
    color: #eee;
    background-color: rgba(199, 199, 199, 1);
    width: 650px;

    max-width: 50px;
    margin-top: 25px;
    margin-bottom: 20px;
  }

  .carousel-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div:nth-child(2) {
      width: 60%;
    }
  }
`
