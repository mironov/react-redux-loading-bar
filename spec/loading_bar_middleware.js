import expect from 'expect'

import createMockStore from './helpers/create_mock_store'
import loadingBarMiddleware from '../src/loading_bar_middleware'
import { showLoading, hideLoading } from '../src/loading_bar_ducks'

describe('loadingBarMiddleware', () => {
  const mockStore = (mockDispatch) =>
    createMockStore(
      [loadingBarMiddleware],
      mockDispatch
    )

  it('returns a function to handle next', () => {
    const mockDispatch = () => {}
    const nextHandler = loadingBarMiddleware(mockDispatch)
    expect(nextHandler).toBeA('function')
  })

  describe('with an action containing "_PENDING" in type', () => {
    it('dispatches SHOW action', () => {
      const originalAction = { type: 'something/FETCH_PENDING' }
      const expectedActions = [
        originalAction,
        showLoading(),
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })

  describe('with an action containing "_FULFILLED" in type', () => {
    it('dispatches HIDE action', () => {
      const originalAction = { type: 'something/FETCH_FULFILLED' }
      const expectedActions = [
        originalAction,
        hideLoading(),
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })

  describe('with an action containing "_REJECTED" in type', () => {
    it('dispatches HIDE action', () => {
      const originalAction = { type: 'something/FETCH_REJECTED' }
      const expectedActions = [
        originalAction,
        hideLoading(),
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })

  describe('with an action does not containing "_PENDING", "_FULFILLED", ' +
           '"_REJECTED" in type', () => {
    it('does not dispatch SHOW and HIDE actions', () => {
      const originalAction = { type: 'something/RANDOM' }
      const expectedActions = [
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })

  describe('with an async action', () => {
    it('does not dispatch SHOW and HIDE actions', () => {
      const originalAction = () => {}
      const expectedActions = [
        originalAction,
      ]

      const mockDispatch = (action) => {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        return action
      }

      mockStore(mockDispatch).dispatch(originalAction)
      expect(expectedActions.length).toEqual(0)
    })
  })
})
