import fetch from 'isomorphic-fetch'
import { shuffle, slice } from 'lodash'

const FETCH = 'photos/FETCH'

const enforceSSL = (photos) =>
  photos.map((photo) => (
    { ...photo, thumbnailUrl: photo.thumbnailUrl.replace('http', 'https') }
  ))

export const fetchPhotos = () => ({
  type: FETCH,
  payload: fetch(
    'https://jsonplaceholder.typicode.com/photos',
    { cache: 'no-cache' }
  ).then((res) => res.json()).then(enforceSSL),
})

export default function photosReducer(state = [], action = {}) {
  switch (action.type) {
    case `${FETCH}_FULFILLED`:
      return slice(shuffle(action.payload), 0, 5)

    default: return state
  }
}
