'use strict';

function groupedTopoSort(graph, groups) {
  let names = Object.keys(graph);
  let sorted = [];

  function visit(name, group, visited) {
    if (visited[name]) return;

    visited[name] = true;

    graph[name].forEach(name => {
      visit(name, group, visited);
    });

    if (!sorted.includes(name) && group.includes(name)) {
      sorted.push(name);
    }
  }

  for (let group of groups) {
    for (let name of group) {
      visit(name, group, {});
    }
  }

  return sorted;
}

module.exports = groupedTopoSort;
