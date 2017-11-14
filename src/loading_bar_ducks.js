export const SHOW = 'loading-bar/SHOW'
export const HIDE = 'loading-bar/HIDE'
export const RESET = 'loading-bar/RESET'

export const DEFAULT_SCOPE = 'default'

export function showLoading(scope = DEFAULT_SCOPE) {
  return {
    type: SHOW,
    payload: {
      scope,
    },
  }
}

export function hideLoading(scope = DEFAULT_SCOPE) {
  return {
    type: HIDE,
    payload: {
      scope,
    },
  }
}

export function resetLoading(scope = DEFAULT_SCOPE) {
  return {
    type: RESET,
    payload: {
      scope,
    },
  }
}

export function loadingBarReducer(state = {}, action = {}) {
  const { scope = DEFAULT_SCOPE } = (action.payload || {})

  switch (action.type) {
    case SHOW:
      return {
        ...state,
        [scope]: (state[scope] || 0) + 1,
      }
    case HIDE:
      return {
        ...state,
        [scope]: Math.max(0, (state[scope] || 1) - 1),
      }
    case RESET:
      return {
        ...state,
        [scope]: 0,
      }
    default:
      return state
  }
}
