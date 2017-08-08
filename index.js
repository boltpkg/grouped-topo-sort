'use strict';

const chalk = require('chalk');

function groupedTopoSort(graph, groups) {
  // TODO: detect cycles
  let cycles = [];

  function sortGroup(group, groupIndex) {
    const g = {
      contains: group,
      visited: {},
      sorted: [],
    };

    function visit(name) {
      if (g.visited[name]) return;
      g.visited[name] = true;
      graph[name].forEach(visit);
      g.sorted.push(name);
    }

    group.forEach(visit);
    return g;
  }

  const sortedGroups = groups.map(sortGroup);
  const sorted = [];

  sortedGroups.forEach(currentGroup => {
    sortedGroups.forEach(innerGroup => {
      innerGroup.sorted.forEach(i => {
        if (currentGroup.contains.includes(i) && !sorted.includes(i)) {
          sorted.push(i);
        }
      });
    });
  });

  return { sorted, cycles };
}

module.exports = groupedTopoSort;
