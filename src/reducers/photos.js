import fetch from 'isomorphic-fetch'
import { shuffle, slice } from 'lodash'

const FETCH = 'photos/FETCH'
const PHOTOS_URL = 'https://gist.githubusercontent.com/mironov/90943481802c227a1585cb979d73b261/raw/479300d55c14d9c49e83857fe53ea741e3699b1c/photos.json'

export const fetchPhotos = () => ({
  type: FETCH,
  payload: fetch(
    PHOTOS_URL,
    { cache: 'no-cache' },
  ).then(res => res.json()),
})

export default function photosReducer(state = [], action = {}) {
  switch (action.type) {
    case `${FETCH}_FULFILLED`:
      return slice(shuffle(action.payload), 0, 5)

    default: return state
  }
}
