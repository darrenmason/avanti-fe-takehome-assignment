import React from 'react'
import {
  StyledHighScoreForm,
  StyledHighScoreText,
  StyledHighScoreLabel,
  StyledHighScoreInput,
  StyledHighScoreButton,
} from '../../styles'
import { StyledHighScoreHeader } from './styles'
import * as gameSelectors from '@packages/sdk/resources/game/selectors'
import { useSelector } from '@packages/sdk'

export default function HighScoreEntryForm(): JSX.Element {
  const score = useSelector(gameSelectors.score)

  return (
    <>
      <StyledHighScoreHeader>High Score Entry</StyledHighScoreHeader>
      <StyledHighScoreText>Score: &nbsp;{score}</StyledHighScoreText>
      <StyledHighScoreForm>
        <StyledHighScoreLabel>Username:</StyledHighScoreLabel>
        <StyledHighScoreInput></StyledHighScoreInput>

        <StyledHighScoreButton
          onClick={(e) => {
            e && e.preventDefault()

            // dispatch(gameActions.getNewGame())
          }}
          type="button"
        >
          Submit
        </StyledHighScoreButton>
      </StyledHighScoreForm>
    </>
  )
}
