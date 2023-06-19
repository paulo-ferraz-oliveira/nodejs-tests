function _(what, msg) {
  if (msg !== undefined) {
    return [what, msg]
  } else {
    return what
  }
}

function is(what, e) {
  if (is_tuple(e, 2)) {
    return e[0] === what
  } else if (is_basic(what, e)) {
    return true
  } else {
    return false
  }
}

function get(what, e) {
  if (is_tuple(e, 2)) {
    return e[1]
  } else if (is_basic(what, e)) {
    return what
  } else {
    throw new Error(`Not an ${what}: ${e}`)
  }
}

function is_typed(what, e) {
  return is(what, e) && is_tuple(e, 2) && is_tuple(e[1])
}

function get_type(what, e) {
  if (is_tuple(e, 2) && is_tuple(e[1])) {
    return e[1][0]
  } else {
    throw new Error(`Not a typed ok/error tuple ${what}: ${e}`)
  }
}

function _new(what) {
  return {
    _: trans(_, what),
    is: trans(is, what),
    get: trans(get, what),
    is_typed: trans(is_typed, what),
    get_type: trans(get_type, what),
  }
}
// Private

function trans(f, what) {
  return function (e) {
    return f(what, e)
  }
}

function is_tuple(ret, length) {
  if (length !== undefined) {
    return Array.isArray(ret) && ret.length == length
  } else {
    return Array.isArray(ret)
  }
}

function is_basic(what, ret) {
  return ret === what
}

module.exports = {
  _new: _new,
}
