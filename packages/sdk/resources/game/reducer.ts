import { GameData } from '.'
import { ReducerAction } from '@packages/sdk'
import * as types from './types'

function generateInitialState(): GameData {
  return {
    charFade: [],
    charFadeIndex: '',
    hearts: [],
    heartsIndex: '',
    highscores: [],
    lowestHighScore: 0,
    highscoresIndex: '',
    numGuesses: 0,
    status: 'playing',
    score: 0,
    word: '',
    wordGuessed: [],
    wordGuessedIndex: '',
    wordLength: 0,
  }
}

export default function gameReducer(
  state = generateInitialState(),
  { type, payload }: ReducerAction<GameData>,
): GameData {
  switch (type) {
    case types.GUESS:
      const charFade = state.charFade
      let hearts = state.hearts
      let numGuesses = state.numGuesses
      let score = state.score
      let status = state.status
      const wordGuessed = state.wordGuessed

      state.word.split('').forEach((char, i) => {
        // If the char guessed is a char in the word
        if (char == payload.charGuessed && !wordGuessed[i]) {
          charFade[i] = numGuesses
          wordGuessed[i] = char
          score++ // Increment score for each instance correct guess
          numGuesses++
        } else {
          wordGuessed[i] = wordGuessed[i] || ''
        }
      })

      // If the char guessed is not in the word
      if (state.word.indexOf(payload.charGuessed) < 0) {
        let reduced = false

        // Empty first heart to left available
        hearts = hearts.map((heart) => {
          if (!reduced && heart) {
            reduced = true
            return 0
          }

          return heart
        })

        score--
        numGuesses++
      }

      // User won
      if (state.word == wordGuessed.join('')) {
        status = 'won'
      }
      // User lost
      else if (hearts.reduce((a, b) => a + b, 0) == 0) {
        status = 'lost'
      }

      return {
        ...state,
        charFade,
        charFadeIndex: charFade.join(''),
        hearts,
        heartsIndex: hearts.join(''),
        numGuesses,
        score,
        status,
        wordGuessed,
        wordGuessedIndex: wordGuessed.join(''),
      }

    case types.SET_HIGH_SCORE:
      const highscores = state.highscores
      highscores.push({ score: state.score, username: payload.username || '' })
      highscores.sort((a, b) => b.score - a.score)
      const topScores = highscores.slice(0, 10)
      const lowestHighScore = topScores[topScores.length - 1].score

      return {
        ...state,
        highscores: topScores, // Only show top ten scores
        lowestHighScore: lowestHighScore,
        highscoresIndex: highscores.map(({ score }) => score).join(''),
      }

    case types.NEW:
      return {
        ...state,
        ...payload,
        status: 'playing',
        wordGuessed: [],
        wordGuessedIndex: '',
        score: 0,
        highscores: state.highscores,
        highscoresIndex: state.highscoresIndex,
      }

    case types.UPDATE:
      return {
        ...state,
        ...payload,
      }

    default:
      return state
  }
}
