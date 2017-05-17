export default function validateAuth(email, password) {
  const result = {email: false, password: false}
  result.email = validateEmail(email)
  result.password = validatePassword(password)
  return result
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

function validatePassword(password) {
  const re = /(?=.*\d)(?=.*[a-zA-Z]).{8,}/
  return re.test(password)
}
