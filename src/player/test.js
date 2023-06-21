const ok = require('../ok.js')
const error = require('../error.js')
const is = require('../../test/utils/assert.js').is

const player = require('.')

function add_new_no_config() {
  is(ok._(), player.add(1))
}

function add_new_id_missing() {
  is(error._('id_compulsory'), player.add())
}

function add_new_config_ok() {
  player.add(1, { dob: 0 })
}

function add_new_config_nok() {
  is(error._(['unknown_key', 'dobi']), player.add(1, { dobi: 0 }))
}

function skipped1() {
  // Should be skipped, so won't actually throw.
  throw new Error()
}

function skipped2() {
  // Should be skipped, so won't actually throw.
  throw new Error()
}

module.exports = {
  before: player.__init_all,
  all: [
    { name: 'Adding a new player OK - no config', fun: add_new_no_config },
    {
      group: true,
      all: [skipped1, skipped2],
      skip: true,
    },
    { name: 'Adding a new player NOK - id missing', fun: add_new_id_missing },
    { name: 'Adding a new player OK - config OK', fun: add_new_config_ok },
    { fun: skipped1, skip: true },
    { name: 'Adding a new player NOK - unknown key', fun: add_new_config_nok },
  ],
}
