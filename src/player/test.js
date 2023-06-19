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

module.exports = {
  before: player.__init_all,
  all: () => {
    return [
      ['Adding a new player OK - no config', add_new_no_config],
      ['Adding a new player NOK - id missing', add_new_id_missing],
      ['Adding a new player OK - config OK', add_new_config_ok],
      ['Adding a new player NOK - unknown key', add_new_config_nok],
    ]
  },
}
