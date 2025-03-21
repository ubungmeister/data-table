import React, { useState } from 'react';
import { Table } from './Table';
import { TreeNodeData } from '@/types';
import { deleteNode } from '@/app/slices/nodeSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';

interface RowProps {
  node: TreeNodeData;
  columns: string[];
  index: number;
}

export const Row: React.FC<RowProps> = ({ node, columns, index }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [expanded, setExpanded] = useState(false);

  // Check if node has any children
  const children = Object.entries(node.children!);
  // Grab the first child key
  const childKey = Object.keys(node.children ?? {})[0];
  // Grab the records from the first child key
  const records = node.children?.[childKey]?.records ?? [];
  // Check if there are any records
  const hasRecords = records.length > 0;

  const handleDelete = (id: string) => {
    console.log('delete:', id);
    dispatch(deleteNode(id));
  };

  return (
    <>
      <tr>
        {/* Expand cell */}
        <td className={`${index % 2 === 0 ? 'bg-gray-200' : ''} text-center`}>
          {hasRecords ? (
            <button
              onClick={() => setExpanded(!expanded)}
              className="cursor-pointer "
            >
              {expanded ? '▼' : '▶'}
            </button>
          ) : (
            '-'
          )}
        </td>

        {/* Data cells */}
        {columns.map((col) => (
          <td className={index % 2 === 0 ? 'bg-gray-200' : ''} key={col}>
            {node.data[col] || ''}
          </td>
        ))}

        {/* Delete button */}
        <td className={`${index % 2 === 0 ? 'bg-gray-200' : ''} text-center`}>
          <button
            style={{
              background: 'none',
              color: 'red',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(node.data['ID'])}
          >
            ✖
          </button>
        </td>
      </tr>

      {/*  Nested table */}
      {expanded && (
        <tr>
          <td colSpan={columns.length} className="pl-10">
            {/* For each child group, we render a new Table */}
            {children.map(
              ([groupName, groupRecords]) => (
                console.log('group:', children),
                (
                  <div
                    key={node.data['ID'] + groupName}
                    style={{ marginTop: '8px' }}
                  >
                    <Table nodes={groupRecords.records} />
                  </div>
                )
              )
            )}
          </td>
        </tr>
      )}
    </>
  );
};
