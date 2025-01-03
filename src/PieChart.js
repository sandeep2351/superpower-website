import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, title }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>{title}</h3>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
