const assert = require('../../test/utils/assert.js')
const is = assert.is
const is_exception = assert.is_exception

const stack = require('.')
const Stack = stack.Stack

function before() {
  return { stack: new Stack() }
}

function returns_true_when_empty(cfg) {
  is(true, cfg.stack.empty())
}

function returns_false_when_not_empty(cfg) {
  cfg.stack.push(1)
  is(false, cfg.stack.empty())
}

function throws_on_empty_stack_peek(cfg) {
  is_exception(stack.EmptyStackException, () => {
    cfg.stack.peek()
  })
}

function allows_peek_when_not_empty(cfg) {
  var pushed = 1
  cfg.stack.push(pushed)
  is(pushed, cfg.stack.peek())
}

function peek_shows_correct_value(cfg) {
  cfg.stack.push(1)
  cfg.stack.push(2)
  is(2, cfg.stack.peek())
  cfg.stack.pop()
  is(1, cfg.stack.peek())
}

function throws_on_empty_stack_pop(cfg) {
  is_exception(stack.EmptyStackException, () => {
    cfg.stack.pop()
  })
}

function pop_returns_correct_value_and_updates_stack(cfg) {
  var pushed = 1
  cfg.stack.push(pushed)
  is(pushed, cfg.stack.pop())
  is(true, cfg.stack.empty())
}

function push_puts_correct_value_in_stack(cfg) {
  var pushed
  is(true, cfg.stack.empty())
  pushed = 1
  cfg.stack.push(pushed)
  is(pushed, cfg.stack.peek())
  pushed = 2
  cfg.stack.push(pushed)
  is(pushed, cfg.stack.peek())
}

function after(cfg) {
  is(true, cfg.stack instanceof Stack)
}

function before_all() {
  console.log()
  console.log()
  console.log('<stack_tests>')
}

function after_all() {
  console.log()
  process.stdout.write('</stack_tests>')
}

module.exports = {
  before: before,
  after: after,
  before_all: before_all,
  after_all: after_all,
  all: () => {
    return [
      ['Returns true when stack is empty', returns_true_when_empty],
      ['Returns false when stack is not empty', returns_false_when_not_empty],
      ['Throws on empty stack .peek()', throws_on_empty_stack_peek],
      ['Allows peek when not empty', allows_peek_when_not_empty],
      ['Peek shows correct value', peek_shows_correct_value],
      ['Throws on empty stack .pop()', throws_on_empty_stack_pop],
      ['Pop works as expected and updates stack', pop_returns_correct_value_and_updates_stack],
      ['Push works as expected and updates stack', push_puts_correct_value_in_stack],
    ]
  },
}
