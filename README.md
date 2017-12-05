# grouped-topo-sort

This package sorts a graph of grouped dependencies into an optimised order for installation / build / etc.

It also reports on cycles in the dependency graph when they cannot be resolved by the groups.

## Usage:

```js
const sort = require('grouped-topo-sort');

// these are the dependencies to sort
const graph = {
  a: ['b'],
  b: ['c'],
  c: ['d'],
  d: ['a'],
};

// we use groups to hint that 'a' can be safely resolved before 'b', 'c' and 'd'
// which lets us break the cycle and return a valid result
const groups = [['a'], ['b', 'c', 'd']];

const result = sort(graph, groups); // { sorted: ['a', 'd', 'c', 'b'] }
```
