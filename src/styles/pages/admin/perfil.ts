import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

export const Container = styled.div`
  .ProfileCard {
    position: relative;
  }

  .FormInput > div {
    border: 1px solid var(--text);
    padding: 0.5rem;
  }

  textarea {
    width: 100%;
    height: auto;

    border-radius: 10px;
    background: var(--background);
    border: 1px solid var(--text);
    padding: 0.5rem;

    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
`

export const Header = styled.div`
  width: auto;
  height: 10rem;
  border-radius: 5px;
  background: var(--blue);
  color: var(--gray-line);

  padding: 2rem 3rem;

  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }
`

export const CardInfo = styled(Card)`
  width: auto;
  height: auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .SubmitButton {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    button {
      width: 15rem;
    }
  }
`

export const UserForms = styled(Grid)`
  h3 {
    font-size: 1.5rem;
    padding-bottom: 1rem;
  }

  h4 {
    padding-left: 0.5rem;
    padding-bottom: 0.3rem;
  }
`

export const AboutMe = styled(Grid)`
  input {
    padding: auto;
    width: 100%;
  }
`

export const CardProfile = styled(Card)`
  width: auto;
  height: auto;
  padding-bottom: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    padding: 1rem 0;
    color: var(--blue);
    font-size: 1.3rem;
  }
  h3 span {
    font-weight: normal;
  }

  .Cidade {
    color: var(--text);
    font-weight: lighter;
  }

  .Funcao {
    color: var(--blue-dark);
    padding-top: 0.5rem;
    padding-bottom: 2rem;
  }

  hr {
    width: 70%;
  }

  .SobreMim {
    padding: 2rem 2rem;
  }
`
export const AvatarContainer = styled.div`
  position: absolute;
  top: -2rem;

  .avatar {
    width: 12rem;
    height: 12rem;
    /* border: solid var(--green) 3px; */
  }

  .avatar:hover {
    top: -0.1rem;
  }
`

export const UserContent = styled.div`
  padding: 11rem 1.5rem 1rem;
  width: 100%;
  height: auto;
  text-align: center;

  display: flex;
  justify-content: space-evenly;

  span {
    font-weight: 600;
  }

  p {
    padding-top: 0.5rem;
    font-weight: 300;
    color: var(--gray-line);
  }
`
