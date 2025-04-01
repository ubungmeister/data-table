import { TreeNodeData } from 'types';

export const filteredData = (allNodes: TreeNodeData[]) => {
  const seenIds: string[] = [];

  // Filter out duplicate nodes
  const uniqueNodes = allNodes.filter((node) => {
    if (!seenIds.includes(node.data.ID)) {
      seenIds.push(node.data.ID);
      return true;
    }
    return false;
  });

  return uniqueNodes;
};
