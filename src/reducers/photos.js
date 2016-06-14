import fetch from 'isomorphic-fetch'
import { shuffle, slice } from 'lodash'

const FETCH = 'photos/FETCH'
const PHOTOS_URL = 'https://gist.githubusercontent.com/mironov/90943481802c227a1585cb979d73b261/raw/e5ffa6e7b8e160be478ef2d63b6212581930d2c1/photos.json'

export const fetchPhotos = () => ({
  type: FETCH,
  payload: fetch(
    PHOTOS_URL,
    { cache: 'no-cache' }
  ).then((res) => res.json()),
})

export default function photosReducer(state = [], action = {}) {
  switch (action.type) {
    case `${FETCH}_FULFILLED`:
      return slice(shuffle(action.payload), 0, 5)

    default: return state
  }
}
