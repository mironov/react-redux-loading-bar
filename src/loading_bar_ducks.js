export const SHOW = 'loading-bar/SHOW'
export const HIDE = 'loading-bar/HIDE'

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

export function loadingBarReducer(state = 0, action = {}) {
  let newState

  switch (action.type) {
    case SHOW:
      newState = state + 1
      break
    case HIDE:
      newState = state > 0 ? state - 1 : 0
      break
    default:
      return state
  }

  return newState
}
