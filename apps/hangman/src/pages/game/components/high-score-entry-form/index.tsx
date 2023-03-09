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
import * as gameActions from '@packages/sdk/resources/game/actions'
import * as userSelectors from '@packages/sdk/resources/user/selectors'
import * as userActions from '@packages/sdk/resources/user/actions'
import { useDispatch, useSelector } from '@packages/sdk'

export default function HighScoreEntryForm(): JSX.Element {
  const dispatch = useDispatch()
  const score = useSelector(gameSelectors.score)
  const username = useSelector(userSelectors.username)

  return (
    <>
      <StyledHighScoreHeader>High Score Entry</StyledHighScoreHeader>
      <StyledHighScoreText>Score: &nbsp;{score}</StyledHighScoreText>
      <StyledHighScoreForm>
        <StyledHighScoreLabel>Username:</StyledHighScoreLabel>
        <StyledHighScoreInput
          value={username}
          onChange={(e) => dispatch(userActions.setUsername(e.target.value))}
        ></StyledHighScoreInput>

        <StyledHighScoreButton
          onClick={(e) => {
            e && e.preventDefault()
            dispatch(gameActions.setHighScore(username))
            dispatch(gameActions.getNewGame())
          }}
          type="button"
        >
          Submit
        </StyledHighScoreButton>
      </StyledHighScoreForm>
    </>
  )
}
