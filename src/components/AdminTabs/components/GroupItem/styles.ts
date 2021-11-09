import styled from 'styled-components'

export const Container = styled.div`
  margin: 1rem 0;

  .AccordionSummary div:first-child {
    display: flex;
    align-items: center;
    justify-content: start;
    .profileUser {
      margin: 0 1rem;

      h4 {
        font-size: 1rem;
        font-weight: 400;
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
