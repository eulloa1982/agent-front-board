// src/pages/DashboardPage.js
import React from 'react';
import DashboardLayout from './dashboardLayout';
import StatusPieChart from './statusPieChart';
import CategoryPieChart from './categoryPieChart';
import TicketsByAgentBarChart from './ticketsByAgentChart';
import TicketsByDayBarChart from './ticketsByDayChart';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        <StatusPieChart />
        <CategoryPieChart />
        <TicketsByAgentBarChart />
        <TicketsByDayBarChart />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
