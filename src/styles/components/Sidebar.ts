import styled from 'styled-components';

import { navBarHeight, sideBarWidth } from '../../config/stylesconfig';

export const Container = styled.div`
  background: var(--blue-dark);
  width: ${sideBarWidth};
  height: calc(100vh - ${navBarHeight} - 2rem);
  border-radius: 14px;

  box-shadow: 5px 0 10px;

  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  
  position: fixed;

  button:first-child {
    margin-top: 5rem;
  }
  
  .space {
    flex-grow: 1;
  }
`;
