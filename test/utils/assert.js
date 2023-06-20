const ok = require('../../src/ok.js')
const error = require('../../src/error.js')

function is(left, right) {
  if (ok.is_typed(left) && ok.is_typed(right)) {
    expect(stringify(ok.get(left)), stringify(ok.get(right)))
  } else if (error.is_typed(left) && error.is_typed(right)) {
    expect(stringify(error.get(left)), stringify(error.get(right)))
  } else if (ok.is(left) && ok.is(right)) {
    expect(ok.get(left), ok.get(right))
  } else if (error.is(left) && error.is(right)) {
    expect(error.get(left), error.get(right))
  } else {
    expect(left, right)
  }
}

function is_exception(exception, f) {
  var is_exception = false
  var e

  try {
    f()
  } catch(e0) {
    e = e0
    if (e0 instanceof exception) {
      is_exception = true
    }
  }

  if (!is_exception) {
    throw `got ${e}, expected ${exception.name}`
  }
}

// Private

function expect(left, right) {
  if (left !== right) {
    throw `got left = ${left}, right = ${right}`
  }
}

function stringify(tuple) {
  return JSON.stringify(tuple)
}

module.exports = {
  is: is,
  is_exception: is_exception
}
