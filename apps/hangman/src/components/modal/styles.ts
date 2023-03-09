import styled from 'styled-components'
import { GameData } from '@packages/sdk/resources/game'

type Background = {
  status: GameData['status']
}

export const StyledModalBackground = styled.div<Background>`
  z-index: 10;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  display: none;
  display: ${({ status }) =>
    (status == 'won' && 'flex') || (status == 'lost' && 'flex')};
`
export const StyledModalBody = styled.div`
  padding: 2rem;
  background: #fff;
  min-width: 300px;
  width: 60%;
  text-align: center;
`
