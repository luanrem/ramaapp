import styled, { css } from 'styled-components';

import Tooltip from '../../components/Tooltip/Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--background);
  border-radius: 10px;
  padding: 0.8rem;
  width: 100%;

  border: 2px solid var(--text);
  color: var(--blue);
  transition: border 0.2s;
  transition: color 0.2s;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 1rem;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #002BC3;
      border-color: #002BC3;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #002BC3;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--blue-dark);

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
