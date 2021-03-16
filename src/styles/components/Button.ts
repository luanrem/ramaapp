import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: linear-gradient(267.79deg, var(--blue-dark) 0%, #001593 99.18%);
  box-shadow: 0px 5px 15px var(--blue-twitter);
  height: 48px;
  border-radius: 8px;
  border: none;
  color: var(--gray-line);
  width: 100%;
  margin-top: 0.5rem;

  font-family: Roboto;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;

  &:active {
    background: ${shade(0.2, '#001593')};
  }
`;
