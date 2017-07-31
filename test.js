var groupedTopoSort = require('./');

function testCase({graph, groups, expected}) {
  let result = groupedTopoSort(graph, groups);
  let actual = result.join(' -> ');

  if (expected !== actual) {
    console.log('Expected: ' + expected);
    console.log('Actual: ' + actual);
  } else {
    console.log('Works!');
  }
}

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: []
  },
  groups: [['a', 'b', 'c', 'd']],
  expected: 'd -> c -> b -> a'
});

testCase({
  graph: {
    a: ['c'],
    b: [],
    c: ['d'],
    d: ['b'],
  },
  groups: [['a', 'b', 'c', 'd']],
  expected: 'b -> d -> c -> a'
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: ['a']
  },
  groups: [['a'], ['b', 'c', 'd']],
  expected: 'a -> d -> c -> b'
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: ['a']
  },
  groups: [['a', 'b'], ['c', 'd']],
  expected: 'b -> a -> d -> c'
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: ['a']
  },
  groups: [['a', 'c'], ['b', 'd']],
  expected: 'c -> a -> d -> b'
});

testCase({
  graph: {
    a: ['b'],
    b: ['c'],
    c: ['d'],
    d: ['a']
  },
  groups: [['a', 'b', 'c', 'd']],
  expected: 'd -> c -> b -> a'
});

testCase({
  graph: {
    a: ['b', 'c'],
    b: ['d'],
    c: ['d'],
    d: ['a']
  },
  groups: [['a'], ['b', 'c', 'd']],
  expected: 'a -> d -> b -> c'
});
