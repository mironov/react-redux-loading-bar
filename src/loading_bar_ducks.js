export const SHOW = 'loading-bar/SHOW'
export const HIDE = 'loading-bar/HIDE'
export const RESET = 'loading-bar/RESET'

export function showLoading(scope = 'default') {
  return {
    type: SHOW,
    payload: {
      scope,
    },
  }
}

export function hideLoading(scope = 'default') {
  return {
    type: HIDE,
    payload: {
      scope,
    },
  }
}

export function resetLoading(scope = 'default') {
  return {
    type: RESET,
    payload: {
      scope,
    },
  }
}

export function loadingBarReducer(state = {}, action = {}) {
  const { scope } = (action.payload || {});

  switch (action.type) {
    case SHOW:
      return {
        [scope]: (state[scope] || 0) + 1,
      }

    case HIDE:
      return {
        [scope]: (state[scope] || 1) - 1,
      }
    case RESET:
      return {
        [scope]: 0,
      }
    default:
      return state
  }
}
