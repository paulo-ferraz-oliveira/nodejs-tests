const test = require('./utils/common')

test.all([
  ['player', require('../src/player/test.js')],
  ['stack', require('../src/stack/test.js')]
])
