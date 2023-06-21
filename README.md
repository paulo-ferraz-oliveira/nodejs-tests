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

### The Ok/error "tuples"

#### The Ok "tuple"

Similar to Erlang's `{:ok, <stuff>}` we introduce/explore this concept in this bit of code
(check `src/utils/ok-error.js`), as `['ok', <stuff>]`. As a companion to this "tuple", we also
consider the return `:ok` (Node.js `'ok'`) as valid.

#### The error "tuple"

The same as above where `:ok` becomes `:error`, and `'ok'` becomes `'error'`.

#### The special tagged `<stuff>`

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

### Common Test similarities

#### `all`

It is expressed here as

```javascript
  all: [
    ['Test description', fn]
  ]
```

or simply

```javascript
  all: [
    fn
  ]
```

where the test name is influenced by Elixir's `test "..." do ... end` macro.

#### `before` (at the suite and group definition -level)

Similar to Common Test's `init_per_testcase` we explore the concept here via `before`.

The same applies to `init_per_group`.

#### `after` (at the suite and group definition -level)

Similar to Common Test's `end_per_testcase` we explore the concept here via `after`.

The same applies to `end_per_group`.

#### `before_all` (at the suite definition -level)

Similar to Common Test's `init_per_suite` we explore the concept here via `before_all`.

#### `after_all` (at the suite -level)

Similar to Common Test's `end_per_suite` we explore the concept here via `after_all`.

#### Groups

Similar to Common Test's groups we allow `{group: 'name', all: [fn, ...]}` for group specific
executions, where `fn` is expressed as in section `all`, above.

#### Configuration dependencies

Configuration for a suite is expected to start as `{}`, and run through `suite.before_all/1`
(only runs once). At the end of the execution of a suite, the configuration is run through
`suite.after_all/1` (again, only runs once).

It gets picked up by:

* `group.before/1`, in the context of a group
* `suite.before/1`, in the context of a testcase

If a testcase is inside a group, the flow is
`suite.before_all/1 > group.before/1 > suite.before/1`, though.

#### Skipping groups/testcases

It is also possible to skip groups or testcases using object property `skip: true`. This will
be reported in the test execution summary.

#### Summary

A test summary will be similar to

```shell
===> Running suites...

%%% suite player: .##..#.
%%% suite stack: ........

Failed 0 test(s). Passed 12 test(s). Skipped 3 test(s).
```

inspired in both Erlang's (`rebar3` actually) and Elixir's output.

## Colored output

I wanted to have pretty output, so I implemented `test/utils/style.js`.

It can be used as `console.log(style.white('Running tests...'))`.

## Current status

This code is not under active development.
