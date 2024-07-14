const style = require('../../test/utils/style.js')

function all(under_test) {
  console.log(style.green('===> Running suites...'))
  console.log()

  under_test.forEach(run_suite)
  summary()
}

// Private

var passed = 0
var failed = 0
var skipped = 0

function req(suite_name) {
  return require(`../../src/${suite_name}/test.js`)
}

function run_suite(suite_name) {
  process.stdout.write(`%%% suite ${suite_name}: `)

  var suite = req(suite_name)
  var suite_cfg = {}
  if (suite.before_all) {
    // Not expected to throw (!)
    suite_cfg = suite.before_all(suite_cfg)
  }

  suite.all.forEach((group_or_testcase) => {
    if (group_or_testcase.group !== undefined) {
      var group = group_or_testcase
      var group_cfg = suite_cfg
      run_group(group, group_cfg, suite, suite_name)
    } else {
      var testcase = group_or_testcase
      var testcase_cfg = suite_cfg
      run_testcase(testcase, testcase_cfg, suite, suite_name)
    }
  })

  if (suite.after_all) {
    // Not expected to throw (!)
    suite.after_all(suite_cfg)
  }

  console.log()
}

function run_group(group, group_cfg, suite, suite_name) {
  var skipped = group.skip
  if (!skipped) {
    if (group.before) {
      // Not expected to throw (!)
      group_cfg = group.before(group_cfg)
    }

    group.all.forEach((testcase) => {
      var testcase_cfg = group_cfg
      run_testcase(testcase, testcase_cfg, suite, suite_name)
    })

    if (group.after) {
      // Not expected to throw (!)
      group.after(group_cfg)
    }
  } else {
    this_skipped(group.all.length)
  }
}

function run_testcase(testcase, testcase_cfg, suite, suite_name) {
  if (suite.before) {
    // Not expected to throw (!)
    testcase_cfg = suite.before(testcase_cfg)
  }

  var test_fun
  if (testcase.fun) {
    test_fun = testcase.fun
  } else {
    test_fun = testcase
  }

  var test_name
  if (testcase.name) {
    test_name = testcase.name
  } else {
    test_name = test_fun.name
  }

  var exc
  var result
  var msg
  if (!testcase.skip) {
    try {
      var test_fun_res = test_fun(testcase_cfg)
      if (test_fun_res === undefined) {
        ;[result, msg] = this_passed()
      } else {
        exc = 'Tests should return either undefined or throw an exception'
        throw exc
      }
    } catch (e) {
      ;[result, msg] = this_failed(e)
      exc = e.stack
    }
  } else {
    ;[result, msg] = this_skipped(1)
  }

  if (result === false) {
    console.log()
    console.log(`%%% suite ${suite_name} ==> ${test_name}: ${style.red('FAILED')}`)
    if (exc) {
      console.log(`%%% suite ${suite_name} ==> ${test_name}: ${exc}`)
    } else {
      console.log(`%%% suite ${suite_name} ==> ${test_name}: ${msg}`)
    }
  }

  if (suite.after) {
    // Not expected to throw (!)
    suite.after(testcase_cfg)
  }
}

function summary() {
  console.log()

  var styled_failed = failed
  if (failed) {
    styled_failed = style.red(failed)
  }

  var styled_passed = passed
  if (passed) {
    styled_passed = style.green(passed)
  }

  process.stdout.write(`Failed ${styled_failed} test(s). Passed ${styled_passed} test(s).`)

  if (skipped) {
    skipped = ` Skipped ${skipped} test(s).`
  } else {
    skipped = ''
  }

  console.log(skipped)

  if (failed) {
    var failures_occurred = style.red(`Failures occurred running tests: ${failed}`, { bold: true })
    console.log(`${style.red('===>')} ${failures_occurred}`)
  }
}

function this_passed() {
  passed += 1

  var dot = style.green('.')
  process.stdout.write(dot)

  return [true, dot]
}

function this_failed(e) {
  failed += 1

  return [false, e]
}

function this_skipped(how_many) {
  skipped += how_many

  var ast = '#'
  while (how_many-- > 0) {
    process.stdout.write(ast)
  }

  return [true, ast]
}

module.exports = {
  all: all,
}
