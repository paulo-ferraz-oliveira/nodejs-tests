# `nodejs-tests` [![CI][ci-img]][ci]

[ci]: https://github.com/paulo-ferraz-oliveira/nodejs-tests/actions/workflows/ci.yml
[ci-img]: https://github.com/paulo-ferraz-oliveira/nodejs-tests/actions/workflows/ci.yml/badge.svg

This started as a practice exercise for Node.js/JavaScript, but since I'm doing quite a bit of
Erlang these days, and I wanted to have something similar to Common Test for testing, I eventually
ended up developing that part of this "showcase" more (even inspiring the output on it).

This repository doesn't aim at having reusable code, but you're Ok to learn from it and copy-paste
from it under the status of its [MIT license](LICENSE.md).

## Experiments/assumptions

All functions either return, an Ok "tuple", an Error "tuple", or `undefined`, which is quite a
common practice in Erlang, though returning non-tuple raw values also is (I am not aiming at
exploring those). It is also possible (and handled) for functions to raise exceptions at times.

We mostly assume atoms as strings (in Erlang you can also write an atom as `'ok'`, so this ended
up fitting rather nicely).

### The Ok "tuple"

Similar to Erlang's `{:ok, <stuff>}` we introduce/explore this concept in this bit of code
(check `src/utils/ok-error.js`), as `['ok', <stuff>]`. As a companion to this "tuple", we also
consider the return `:ok` (Node.js `'ok'`) as valid.

## The error "tuple"

The same as above where `:ok` becomes `:error`, and `'ok'` becomes `'error'`.

## The special tagged `<stuff>`

Because it's quite restrictive to not be able to classify `<stuff>` we also explore the "tagged
tuple" with extra info, so there's special handling (internally) for return values like
`['ok', ['unknown_key', 'dobi']]`. The same is valid for `error`s.

## The folder structure

We kept the tests next to the code, under `test.js` as is common practice with `eunit` (though
some times you'll even find the tests in the module's code).

## The tests

### Assertions

You can write assertions like

```javascript
function add_new_no_config() {
  is(ok._(), player.add(1))
}
```

which will roughly translate to Erlang's (if you're using the `eunit` macros)

```erlang
add_new_no_config() ->
  ?assertEqual(ok, player:add(1)).
```

### Common Test's `all/0`

It is expressed here as

```javascript
  all: () => { return [
    ['Test description', fn]
  ] }
```

where the test name is influenced by Elixir's `test "..." do ... end` macro.

### `before`

Similar to Common Test's `init_per_testcase` we explore the concept here via `before`.

### `after`

Similar to Common Test's `end_per_testcase` we explore the concept here via `after`.

### Summary

A test summary will be similar to

```shell
Running tests...
.
Test [player] Adding a new player NOK - id missing
Failed: got left = id_compulsor, right = id_compulsory
..

Summary: 3 passed, 1 failed
ERROR: not all tests passed!
```

inspired in both Erlang's and Elixir's output.

## Colored output

I wanted to have pretty output, so I implemented `test/utils/style.js`.

It can be used as `console.log(style.white('Running tests...'))`.

## Current status

This code is not under active development.
