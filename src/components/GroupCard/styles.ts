import { Card } from '@material-ui/core'
import styled from 'styled-components'

export const Container = styled.div``

export const CardDnd = styled(Card)`
  width: 17rem;
  height: auto;
  padding: 1rem;
  margin: 0 1rem;

  .sectionDiv {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: gray;
  }
`
export const SectionTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
`

export const SpaceNull = styled.div`
  height: 4rem;
`
