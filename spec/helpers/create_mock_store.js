import { applyMiddleware } from 'redux'

export default (middlewares, mockDispatch) => {
  function mockStoreWithoutMiddleware() {
    return {
      getState() {},
      dispatch: mockDispatch,
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares,
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}
