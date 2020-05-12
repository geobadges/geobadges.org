import get from 'lodash.get'
import set from 'lodash.set'
import defaultState from './constants/default-redux-store-state'
import mapping from './constants/url-param-to-store'
import { getNormalizedURLSearchParams, getSection } from './utils/url-parsing'

export default function hydrate() {
  const initialState = JSON.parse(JSON.stringify(defaultState));
  const section = getSection()
  if (section) {
    const parsed = getNormalizedURLSearchParams()

    for (const key in parsed) {
      const value = parsed[key]
      if (value) {
        const path = mapping[section][key]
        if (['page', 'query', 'size', 'sort'].includes(key)) {
          set(initialState, path, value)
        } else if (
          [
            'agencies',
            'languages',
            'licenses',
            'skillLevels',
            'timeRequired',
            'usageTypes'
          ].includes(key)
        ) {
          const filters = get(initialState, path)
          value.forEach(item => {
            filters.push({ category: key, value: item, modified: new Date().getTime() })
          })
        }
      }
    }
  }

  return initialState
}
