import styled from 'styled-components'

import { drawerSideBarWidth } from '../../config/stylesconfig'

export const Container = styled.div`
  background: var(--blue-dark);
  width: ${drawerSideBarWidth};
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: flex-start;

  #nested-list-subheader {
    color: var(--gray-line);
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      color: var(--gray-line);
    }
  }

  li {
    color: var(--gray-line);
    height: 3rem;

    .Icon {
      padding-right: 3rem;
    }
  }
`

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;

  color: var(--gray-line);

  .avatar {
    width: 7rem;
    height: 7rem;
    border: solid var(--green) 3px;
  }

  h2 {
    font-size: 1rem;
    padding-top: 1rem;
  }

  span {
    font-size: 0.9rem;
  }
`
