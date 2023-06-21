const ok = require('../ok.js')
const error = require('../error.js')

var players = {}

function add(id, config) {
  if (id === undefined) {
    return error._('id_compulsory')
  }

  if (config === undefined) {
    config = {}
  }

  var checked_config_keys = check_config_keys(config)
  if (!error.is(checked_config_keys)) {
    players[id] = config
  }

  return checked_config_keys
}

// Caution!

function __init_all(cfg) {
  players = {}
  return cfg
}

// Private

var known_config_keys = {
  name: (name) => {
    typeof name === 'string'
  },
  dob: Number.isInteger,
}

function check_config_key_type(key, config_key) {
  var assertion = known_config_keys[key]
  if (!assertion(config_key)) {
    return error._(['unexpected_key_type', key])
  }

  return ok._()
}

function check_config_keys(config) {
  for (var key in config) {
    if (!known_config_keys[key]) {
      return error._(['unknown_key', key])
    } else {
      var checked_config_key_type = check_config_key_type(key, config[key])
      if (error.is(checked_config_key_type)) {
        return checked_config_key_type
      }
    }
  }
  return ok._()
}

module.exports = {
  add: add,
  __init_all: __init_all,
}
