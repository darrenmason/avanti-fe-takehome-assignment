import { ReducerAction } from '@packages/sdk'
import * as types from './types'
import { User } from '.'

const initialState = {
  id: null,
  username: '',
}

export default function userReducer(
  state = initialState,
  { type, payload }: ReducerAction<User>,
): User {
  switch (type) {
    case types.LOGIN:
      return {
        ...state,
        ...payload,
      }

    case types.SET_USERNAME:
      return {
        ...state,
        ...payload,
      }

    default:
      return state
  }
}
