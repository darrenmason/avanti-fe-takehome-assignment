import React, { ReactNode } from 'react'
import { StyledModalBackground, StyledModalBody } from './styles'
import { useSelector } from '@packages/sdk'
import * as gameSelectors from '@packages/sdk/resources/game/selectors'

type Props = {
  children?: ReactNode
  show: boolean
}

export default function Modal({ children, show }: Props): JSX.Element {
  const status = useSelector(gameSelectors.status)
  return (
    <StyledModalBackground status={status}>
      <StyledModalBody>{children}</StyledModalBody>
    </StyledModalBackground>
  )
}
