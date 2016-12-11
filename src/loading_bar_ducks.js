export const SHOW = 'loading-bar/SHOW'
export const HIDE = 'loading-bar/HIDE'
export const RESET = 'loading-bar/RESET'

export function showLoading() {
  return {
    type: SHOW,
  }
}

export function hideLoading() {
  return {
    type: HIDE,
  }
}

export function resetLoading() {
  return {
    type: RESET,
  }
}

export function loadingBarReducer(state = 0, action = {}) {
  let newState

  switch (action.type) {
    case SHOW:
      newState = state + 1
      break
    case HIDE:
      newState = state > 0 ? state - 1 : 0
      break
    case RESET:
      newState = 0
      break
    default:
      return state
  }

  return newState
}
