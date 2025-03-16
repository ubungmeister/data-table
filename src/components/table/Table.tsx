import React from 'react';
import { TreeNodeData } from '@/types';
import { Row } from './Row';

interface TableProps {
  nodes: TreeNodeData[];
}

export const Table: React.FC<TableProps> = ({ nodes }) => {
  if (!nodes.length) return <div></div>;

  const columnNames = Object.keys(nodes[0].data);

  return (
    <table className="w-full">
      {/* Table header */}
      <thead className="bg-indigo-500 text-white">
        <tr>
          <th className="w-12"></th>
          {columnNames.map((col) => (
            <th key={col} className="p-2">
              {col}
            </th>
          ))}
          <th className="w-20">delete</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
        {nodes.map((node, index) => (
          <Row  index={index} key={node.data.ID} node={node} columns={columnNames} />
        ))}
      </tbody>
    </table>
  );
};
