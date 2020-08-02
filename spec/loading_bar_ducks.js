/* eslint import/no-extraneous-dependencies: 0 */
import expect from 'expect'

import {
  loadingBarReducer,
  SHOW,
  HIDE,
  RESET,
  DEFAULT_SCOPE,
  showLoading,
  hideLoading,
  resetLoading,
} from '../src/loading_bar_ducks'

describe('loadingBarReducer', () => {
  it('returns the initial state', () => {
    expect(loadingBarReducer(undefined, {})).toEqual({})
  })

  it('handles SHOW', () => {
    expect(
      loadingBarReducer(undefined, { type: SHOW }),
    ).toEqual({ [DEFAULT_SCOPE]: 1 })

    expect(
      loadingBarReducer({ [DEFAULT_SCOPE]: 0 }, { type: SHOW }),
    ).toEqual({ [DEFAULT_SCOPE]: 1 })

    expect(
      loadingBarReducer({ [DEFAULT_SCOPE]: 1 }, { type: SHOW }),
    ).toEqual({ [DEFAULT_SCOPE]: 2 })
  })

  it('handles HIDE', () => {
    expect(
      loadingBarReducer({ [DEFAULT_SCOPE]: 1 }, { type: HIDE }),
    ).toEqual({ [DEFAULT_SCOPE]: 0 })

    expect(
      loadingBarReducer(undefined, { type: HIDE }),
    ).toEqual({ [DEFAULT_SCOPE]: 0 })

    expect(
      loadingBarReducer({ [DEFAULT_SCOPE]: 0 }, { type: HIDE }),
    ).toEqual({ [DEFAULT_SCOPE]: 0 })
  })

  it('handles RESET', () => {
    expect(
      loadingBarReducer({ [DEFAULT_SCOPE]: 1 }, { type: RESET }),
    ).toEqual({ [DEFAULT_SCOPE]: 0 })

    expect(
      loadingBarReducer(undefined, { type: RESET }),
    ).toEqual({ [DEFAULT_SCOPE]: 0 })

    expect(
      loadingBarReducer({ [DEFAULT_SCOPE]: 10 }, { type: RESET }),
    ).toEqual({ [DEFAULT_SCOPE]: 0 })
  })
})

describe('actions', () => {
  it('creates an action to show loading bar', () => {
    expect(showLoading())
      .toEqual({ type: SHOW, payload: { scope: DEFAULT_SCOPE } })
  })

  it('creates an action to show a custom loading bar', () => {
    expect(showLoading('someScope'))
      .toEqual({ type: SHOW, payload: { scope: 'someScope' } })
  })

  it('creates an action to hide loading bar', () => {
    expect(hideLoading())
      .toEqual({ type: HIDE, payload: { scope: DEFAULT_SCOPE } })
  })

  it('creates an action to hide a custom loading bar', () => {
    expect(hideLoading('someScope'))
      .toEqual({ type: HIDE, payload: { scope: 'someScope' } })
  })

  it('creates an action to reset loading bar', () => {
    expect(resetLoading())
      .toEqual({ type: RESET, payload: { scope: DEFAULT_SCOPE } })
  })

  it('creates an action to reset a custom loading bar', () => {
    expect(resetLoading('someScope'))
      .toEqual({ type: RESET, payload: { scope: 'someScope' } })
  })
})
