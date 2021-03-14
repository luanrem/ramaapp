import styled from 'styled-components';

import { Scrollbars } from 'react-custom-scrollbars';

import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  align-items: center;

  color: var(--gray-line);
  
  .avatar {
    width: 3.5rem;
    height: 3.5rem;
    border: solid var(--green) 3px;
  }

  .Notifications {
    color: var(--gray-line);
  }

  .VertIcon {
    color: var(--gray-line);
    min-width: 0.2rem;
    width: 0.3rem;
    margin-left: 0.5rem;
  }
`;

export const NameContainer = styled.div`
  text-align: end;
  padding: 0 1rem;

  h2 {
    font-size: 24px;
  }
`;

export const NotificationBall = styled.div`
  width: 0.7rem;
  height: 0.7rem; 
  background-color: var(--green);

  border-radius: 50%;

  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;

export const NotificationList = styled.div`
  width: 20rem;
  height: 15rem;

  display: flex;
  flex-direction: column;

  padding: 0.2rem;

  > div {
    height: 100%;
  }
`;

export const ScrollbarsContainer = styled(Scrollbars)`
  height: 100px;
`;

export const MotionDiv = styled(motion.div)`

`;