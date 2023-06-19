const style = require('../../test/utils/style.js')

function all(under_test) {
  under_test.forEach(run_all)
  summary()
}

// Private

var passed = 0
var failed = 0

function req(what) {
  return require(`../../src/${what}/test.js`)
}

function run_all(what) {
  console.log(style.white('Running tests...'))

  var tests = req(what)
  tests.all().forEach(
    ([test_name, test_fun]) => {
      if (tests.before) {
        tests.before()
      }

      var result
      var msg = "undefined"

      try {
        test_fun_res = test_fun()
        if (test_fun_res === undefined) {
          [result, msg] = this_passed()
        } else {
          throw 'Tests should return either undefined or throw an exception'
        }
      } catch(e) {
        [result, msg] = this_failed(e)
      }

      if (result === false) {
        console.log()
        console.log(`Test [${what}] ${style.cyan(test_name)}`)
        console.log(style.red(`Failed: ${msg}`, {bold: true}))
      }
    }
  )
}

function summary() {
  console.log()
  console.log()
  var styled_failed = failed
  if (failed) {
    styled_failed = style.red(failed, {bold: true})
  }
  var styled_passed = passed
  if (passed) {
    styled_passed = style.green(passed, {bold: true})
  }
  console.log(`${style.white('Summary')}: ${styled_passed} passed, ${styled_failed} failed`)
  if (failed) {
    console.log(style.red('ERROR: not all tests passed!', {bold: true}))
  }
}

function this_passed() {
  passed += 1
  process.stdout.write(style.green('.', {bold: true}))
  return [true, '.']
}

function this_failed(e) {
  failed += 1
  return [false, e]
}

module.exports = {
  all: all
}
