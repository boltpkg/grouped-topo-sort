'use strict';

function groupedTopoSort(graph, groups) {
  let cycles = [];
  let cycleCache = [];
  let visitedNodes = [];

  function sortGroup(nodes, groupIndex) {
    const group = {
      contains: nodes,
      visited: {},
      sorted: [],
      cycles: [],
    };

    function sortNodes(name, branch) {
      if (group.visited[name]) {
        return;
      }
      group.visited[name] = true;
      graph[name].forEach(sortNodes);
      group.sorted.push(name);
    }

    nodes.forEach(sortNodes);

    function walkBranch(branchNodes, branch) {
      branchNodes.forEach(node => {
        const currentBranch = branch ? branch.slice() : [];
        let cycle = currentBranch.includes(node);
        currentBranch.push(node);
        if (graph[node].length && !cycle) {
          walkBranch(graph[node], currentBranch);
        } else if (cycle) {
          const cacheKey = branch.slice().sort().join();
          if (!cycleCache.includes(cacheKey)) {
            let cyclesIntoPreviousGroup = false;
            for (let i = 0; i < branch.length; i++) {
              if (visitedNodes.includes(branch[i])) {
                cyclesIntoPreviousGroup = true;
                break;
              }
            }
            if (!cyclesIntoPreviousGroup) {
              let cyclesBackIntoGroup = false;
              for (let i = 1; i < branch.length; i++) {
                if (group.contains.includes(branch[i])) {
                  cyclesBackIntoGroup = true;
                  break;
                }
              }
              if (cyclesBackIntoGroup) {
                group.cycles.push(currentBranch);
                cycleCache.push(cacheKey);
              }
            }
          }
        }
      });
    }

    walkBranch(nodes);
    visitedNodes = visitedNodes.concat(group.contains);

    return g;
  }

  const sortedGroups = groups.map(sortGroup);
  const sorted = [];

  sortedGroups.forEach((group, groupIndex) => {
    cycles = cycles.concat(group.cycles);
    sortedGroups.forEach(innerGroup => {
      innerGroup.sorted.forEach(i => {
        if (group.contains.includes(i) && !sorted.includes(i)) {
          sorted.push(i);
        }
      });
    });
  });

  return { sorted, cycles };
}

module.exports = groupedTopoSort;
