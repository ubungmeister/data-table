import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TablePage } from '@/pages/TablePage';
import { ErrorPage } from '@/pages/ErrorPage';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TablePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
