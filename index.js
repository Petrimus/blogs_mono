const http = require('http')
const config = require('./server/util/config')
const app = require('./server/app')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${config.PORT}`)
})