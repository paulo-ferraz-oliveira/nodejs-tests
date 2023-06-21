function Stack() {
  var that = this
  that.stack = []
  that.empty = function () {
    // Tests if this stack is empty.
    // Returns true if and only if this stack contains no items; false otherwise.
    return !that.stack.length
  }
  that.peek = function () {
    // Looks at the object at the top of this stack without removing it from the stack.
    // Returns the object at the top of this stack.
    // Throws: EmptyStackException - if this stack is empty.
    throw_if_empty(that)
    return that.stack[that.stack.length - 1]
  }
  that.pop = function (item) {
    // Removes the object at the top of this stack and returns that object as the value of
    //  this function.
    // Returns the object at the top of this stack.
    // Throws: EmptyStackException - if this stack is empty.
    throw_if_empty(that)
    return that.stack.pop(item)
  }
  that.push = function (item) {
    // Pushes an item onto the top of this stack.
    // Returns the item argument.
    return that.stack.push(item)
  }

  // Private

  function throw_if_empty() {
    if (that.empty()) {
      throw new EmptyStackException()
    }
  }

  return that
}

// Private

function EmptyStackException() {
  var that = this
  that.name = 'EmptyStackException'
  that.toString = function () {
    return that.name
  }

  return that
}

module.exports = {
  Stack: Stack,
  EmptyStackException: EmptyStackException,
}
