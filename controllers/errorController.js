const errorController = {}

errorController.throwError = (req, res, next) => {
  const error = new Error("Oops! This is a test 500 error 🤯")
  error.status = 500
  throw error
}

module.exports = errorController