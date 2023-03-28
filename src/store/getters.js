// import { fromJS } from 'immutable'

// export const mainCounter = state => state.counters.main

// Elements
export const localizedElements = state => {
  // let locale = state.language.locale === 'en_US' ? 'default' : state.language.locale
  let defaultElements = state.elements.default
  console.log('Default element: ' + JSON.stringify(defaultElements))
  // console.log('state.elements.default: ' + JSON.stringify(state.elements.default))
  return defaultElements
  // let localizedData = state.elements[locale]
  // return fromJS(defaultElements).mergeDeep(localizedData).toJS()
}

export const filteredElements = state => {
  let search = state.filters.search
  let groups = state.filters.groups
  let filteredDataIds = []
  let localizedData = localizedElements(state)

  // Filter by text query
  for (let key = 1; key <= 118; key++) {
    // console.log('key: ' + key)
    // console.log('localizedData[key]: ' + localizedData[1])
    if (localizedData[key].name.toLowerCase().includes(search.toLowerCase())) {
      filteredDataIds.push(+key)
    }
  }

  // Filter by groups
  if (groups.length > 0) {
    let idsFilteredByGroups = []

    for (let id of filteredDataIds) {
      if (groups.includes(localizedData[id].elementGroup)) {
        idsFilteredByGroups.push(+id)
      }
    }
    filteredDataIds = idsFilteredByGroups
  }

  return filteredDataIds
}
