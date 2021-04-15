require('dotenv').config()

let PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  PORT = 3003
}

let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}

