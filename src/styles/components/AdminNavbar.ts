import styled from 'styled-components';

import { maxWidthContainer, navBarHeight } from '../../config/stylesconfig';

export const Content = styled.div`
  width: 100%;
  background: var(--blue);
`;

export const Container = styled.div`
  max-width: ${maxWidthContainer};
  margin: 0 auto;
  height: ${navBarHeight};

  padding: 0 1rem;


  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  display: flex;
  
  span {
    margin-right: 3rem;
  }

  h1 {
    font-family: GoodTimes, Arial, Helvetica, sans-serif;
    font-size: 1.8rem;
    color: var(--gray-line);
  }

  h2 {
    font-family: GoodTimes, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    color: var(--gray-line);
  }

  button {
    color: var(--gray-line);
  }


`;

export const MobileHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;