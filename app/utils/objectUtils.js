// Javascript Extensions
function getKeyByValue(object, value) {
  const desiredKey = Object.keys(object).find(key => (
    parseInt(object[key]) === parseInt(value)
  ))
  return desiredKey
}

module.exports = {
  getKeyByValue: getKeyByValue,
}
