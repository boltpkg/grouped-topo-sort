'use strict';

const chalk = require('chalk');
const groupedTopoSort = require('./');

function testCase({ graph, groups, expected }) {
  let { sorted: result, cycles } = groupedTopoSort(graph, groups);
  let actual = result.join(' -> ');

  if (expected.sorted !== actual) {
    console.log(chalk.grey(`expected: [${expected.sorted}]`));
    console.log(chalk.red(`..actual: [${actual}]`));
  } else {
    console.log(chalk.green(`passed:   [${actual}]`));
  }
}

console.log(chalk.white('\n----------------------------\n'));

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: [],
  },
  groups: [['a', 'b', 'c', 'd']],
  expected: {
    sorted: 'd -> c -> b -> a',
    cycles: [],
  },
});

testCase({
  graph: {
    a: ['c'],
    b: [],
    c: ['d'],
    d: ['b'],
  },
  groups: [['a', 'b', 'c', 'd']],
  expected: {
    sorted: 'b -> d -> c -> a',
    cycles: [],
  },
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: ['a'],
  },
  groups: [['a'], ['b', 'c', 'd']],
  expected: {
    sorted: 'a -> d -> c -> b',
    cycles: [],
  },
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: ['a'],
  },
  groups: [['a', 'b'], ['c', 'd']],
  expected: {
    sorted: 'b -> a -> d -> c',
    cycles: [],
  },
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: ['a'],
  },
  groups: [['a', 'c'], ['b', 'd']],
  expected: {
    sorted: 'c -> a -> d -> b',
    cycles: [],
  },
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: ['a'],
  },
  groups: [['a', 'b', 'c', 'd']],
  expected: {
    sorted: 'd -> c -> b -> a',
    cycles: [],
  },
});

testCase({
  graph: {
    a: ['b', 'c'],
    b: ['d'],
    c: ['d'],
    d: ['a'],
  },
  groups: [['a'], ['b', 'c', 'd']],
  expected: {
    sorted: 'a -> d -> b -> c',
    cycles: [],
  },
});

testCase({
  graph: {
    a: ['b', 'c'],
    b: ['d'],
    c: ['d'],
    d: ['a'],
  },
  groups: [['a'], ['b'], ['c', 'd']],
  expected: {
    sorted: 'a -> b -> d -> c',
    cycles: [],
  },
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['a'],
  },
  groups: [['a', 'b', 'c']],
  expected: {
    sorted: 'c -> b -> a',
    cycles: [
      {
        a: ['b'],
        b: ['c'],
        c: ['a'],
      },
    ],
  },
});
