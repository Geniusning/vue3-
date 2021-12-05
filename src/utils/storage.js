export const setStorage = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getStorage = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

export const clearAllStorage = () => {
  window.localStorage.clear()
}
