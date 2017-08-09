'use strict';

const chalk = require('chalk');
const groupedTopoSort = require('./');

function testCase({ graph, groups, expected }) {
  const { sorted, cycles } = groupedTopoSort(graph, groups);

  const result = {
    sorted: sorted.join(' -> '),
    cycles: cycles.map(i => i.join(' -> ')).join('] ['),
  };

  expected.cycles = expected.cycles ? expected.cycles.join('] [') : '';

  if (expected.sorted !== result.sorted) {
    console.log(chalk.grey(`sort expected:   [${expected.sorted}]`));
    console.log(chalk.red(`sort result:     [${result.sorted}]`));
  } else {
    console.log(chalk.green(`sort passed:     [${result.sorted}]`));
  }

  if (expected.cycles !== result.cycles) {
    console.log(chalk.grey(`cycles expected: [${expected.cycles}]`));
    console.log(chalk.red(`cycles result:   [${result.cycles}]`));
  } else {
    if (!result.cycles) {
      console.log(chalk.green(`cycles passed:   ${chalk.grey('[none]')}`));
    } else {
      console.log(chalk.green(`cycles passed:   [${result.cycles}]`));
    }
  }
}

console.log(chalk.white('\n\n\n\n----------------------------\n\n\n\n'));

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
    cycles: ['a -> b -> c -> d -> a'],
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
    cycles: ['a -> b -> c -> d -> a'],
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
    cycles: ['a -> b -> c -> d -> a'],
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
  },
});

testCase({
  graph: {
    a: ['b'],
    b: ['a'],
  },
  groups: [['a', 'b']],
  expected: {
    sorted: 'b -> a',
    cycles: ['a -> b -> a'],
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
    cycles: ['a -> b -> c -> a'],
  },
});

testCase({
  graph: {
    a: ['b'],
    b: ['c', 'a'],
    c: ['a'],
  },
  groups: [['a', 'b', 'c']],
  expected: {
    sorted: 'c -> b -> a',
    cycles: ['a -> b -> c -> a', 'a -> b -> a'],
  },
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['a'],
  },
  groups: [['a', 'c'], ['b']],
  expected: {
    sorted: 'c -> a -> b',
    cycles: ['a -> b -> c -> a'],
  },
});

console.log(chalk.white('\n\n'));
