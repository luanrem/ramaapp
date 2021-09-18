import styled from 'styled-components'

export const Container = styled.div``

export const UserAccountView = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 1rem;

  > div:first-child {
    width: 10rem;
    height: 10rem;
    margin-right: 2rem;
  }

  .textUserFields {
    display: flex;
    flex-direction: column;

    width: 20rem;
  }

  .userAndDate {
    display: flex;

    div:first-child {
      margin-right: 2rem;
    }
  }
`

export const AboutMeView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem 0;
  flex-wrap: wrap;

  .textFields {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div {
    margin: 0.5rem 0;
  }
`

export const AddressView = styled.div`
  margin: 1rem 0;

  .cityStatePhone {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`
