/* eslint-disable @typescript-eslint/no-empty-object-type */
interface DataNode {
  [key: string]: string;
}

interface Child {
  records: TreeNodeData[];
}

export interface TreeNodeData {
  data: DataNode;  
  children?: Record<string, Child>;  
}
