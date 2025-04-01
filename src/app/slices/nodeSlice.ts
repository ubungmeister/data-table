import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TreeNodeData } from 'types';
import data from '@/data.json';
import { filteredData } from 'utils/filteredData';

const initialState: TreeNodeData[] = filteredData(data as TreeNodeData[]);

// Recursive deletion function:
function deleteNodeRecursive(
  nodes: TreeNodeData[],
  id: string
): TreeNodeData[] {
  return (
    nodes
      // Remove the node that matches
      .filter((node) => node.data.ID !== id)
      // Rebuild each remaining node & children immutably
      .map((node) => {
        if (!node.children) return node; // no children => no changes

        // Build a new children object
        const newChildren: Record<string, { records: TreeNodeData[] }> = {};
        for (const key of Object.keys(node.children)) {
          newChildren[key] = {
            ...node.children[key],
            records: deleteNodeRecursive(node.children[key].records, id),
          };
        }
        return {
          ...node,
          children: newChildren,
        };
      })
  );
}

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    deleteNode: (state, action: PayloadAction<string>) => {
      return deleteNodeRecursive(state, action.payload);
    },
  },
});

export const { deleteNode } = nodesSlice.actions;
export default nodesSlice.reducer;
