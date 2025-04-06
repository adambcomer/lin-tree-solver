export { config }

import vikeServer from 'vike-server/config'

const config = {
  extends: [vikeServer],
  server: 'server/index.ts'
}
