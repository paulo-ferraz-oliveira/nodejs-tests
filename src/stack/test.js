const assert = require('../../test/utils/assert.js')
const is = assert.is
const is_exception = assert.is_exception

const stack = require('.')
const Stack = stack.Stack
const EmptyStackException = stack.EmptyStackException

function before(cfg) {
  cfg.stack = new Stack()
  return cfg
}

function returns_true_when_empty(cfg) {
  is(true, cfg.stack.empty())
}

function returns_false_when_not_empty(cfg) {
  cfg.stack.push(1)
  is(false, cfg.stack.empty())
}

function throws_on_empty_stack_peek(cfg) {
  is_exception(EmptyStackException, () => {
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
  is_exception(EmptyStackException, () => {
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
  is(true, cfg.stack.empty())
  var pushed = 1
  cfg.stack.push(pushed)
  is(pushed, cfg.stack.peek())
  pushed = 2
  cfg.stack.push(pushed)
  is(pushed, cfg.stack.peek())
}

function after(cfg) {
  is(true, cfg.stack instanceof Stack)
  return cfg
}

function before_all(cfg) {
  return cfg
}

function after_all(cfg) {
  return cfg
}

module.exports = {
  before: before,
  after: after,
  before_all: before_all,
  after_all: after_all,
  all: [
    {
      group: '.empty',
      all: [
        {
          name: 'Returns true when stack is empty',
          fun: returns_true_when_empty,
        },
        {
          name: 'Returns false when stack is not empty',
          fun: returns_false_when_not_empty,
        },
      ],
    },
    {
      group: '.peek',
      all: [
        {
          name: 'Throws on empty stack .peek()',
          fun: throws_on_empty_stack_peek,
        },
        { name: 'Allows peek when not empty', fun: allows_peek_when_not_empty },
        { name: 'Peek shows correct value', fun: peek_shows_correct_value },
      ],
    },
    {
      group: '.pop',
      all: [
        throws_on_empty_stack_pop,
        {
          name: 'Pop works as expected and updates stack',
          fun: pop_returns_correct_value_and_updates_stack,
        },
      ],
    },
    {
      group: '.push',
      all: [
        {
          name: 'Push works as expected and updates stack',
          fun: push_puts_correct_value_in_stack,
        },
      ],
    },
  ],
}
