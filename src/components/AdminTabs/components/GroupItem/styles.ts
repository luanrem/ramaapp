import styled from 'styled-components'

export const Content = styled.div``

export const Container = styled.div`
  margin: 1rem 0;

  .AccordionSummary div:first-child {
    display: flex;
    align-items: center;
    justify-content: start;
    max-width: 100%;
    .profileUser {
      margin: 0 0 0 1rem;
      flex-grow: 1;
      max-width: 80%;

      h4 {
        font-size: 1rem;
        font-weight: 400;
        max-width: 100%;

        /* 3 dots in the end */
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      span {
        font-size: 0.85rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.54);
      }
    }
  }

  .AccordionDetails div {
    h4 {
      font-size: 0.85rem;
      font-weight: 500;
    }
    p {
      font-size: 0.85rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.54);
      max-width: 100%;

      /* 3 dots in the end */
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    div {
      max-width: 100%;
    }

    button {
      position: absolute;
      right: 0.4rem;
      bottom: 0rem;
    }
  }
`
