import { useSelector } from 'react-redux';
import { Table } from 'components/table/Table';
import { RootState } from 'app/store';

export const TablePage: React.FC = () => {
  const nodes = useSelector((state: RootState) => state.nodes);

  return (
    <div className="container mx-auto p-10">
      <Table nodes={nodes} />
    </div>
  );
};
