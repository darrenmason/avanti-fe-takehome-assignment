import Image from 'next/image'
import React from 'react'
import { StyledHeartContainer } from './styles'

interface Props {
  status: number
}

export default function Heart({ status }: Props): JSX.Element {
  const size = 24
  const heartFull = `/icons/heart-full.svg`
  const heartEmpty = `/icons/heart-empty.svg`
  return (
    <StyledHeartContainer>
      <Image height={size} src={status ? heartFull : heartEmpty} width={size} />
    </StyledHeartContainer>
  )
}
