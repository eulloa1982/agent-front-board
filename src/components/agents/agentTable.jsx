import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export default function AgentTable({ rows, onSelect }) {
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'role', headerName: 'Position', flex: 1 },
    { field: 'officeLocation', headerName: 'Location', flex: 1 }
  ];

  return (
    <Box sx={{ height: 500 }}>
      <DataGrid
        rows={rows.map(a => ({ ...a, id: a.id }))}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowClick={(params) => onSelect(params.row)}
      />
    </Box>
  );
}
