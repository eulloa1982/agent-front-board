// components/settings/tableAgents.jsx
import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  //IconButton,
  Switch,
} from "@mui/material";
//import { Edit, Delete } from "@mui/icons-material";

const TableAgents = ({ agents, loading, error }) => {
  if (loading) return <p>Loading agents...</p>;
  if (error) return <p style={{ color: "red" }}>Error loading agents</p>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Supervisor?</TableCell>
          <TableCell>Disabled?</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={agent.id}>
            <TableCell>{agent.id}</TableCell>
            <TableCell>{agent.name}</TableCell>
            <TableCell>
              <Switch checked={!!agent.supervisor} disabled />
            </TableCell>
            <TableCell>
              <Switch checked={!!agent.disabled} disabled />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAgents;

/**
 * const TableAgents = ({ agents, onEdit, onDelete, loading, error }) => {
 * <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Supervisor</TableCell>
          <TableCell>Deshabilitado</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={agent.id}>
            <TableCell>{agent.id}</TableCell>
            <TableCell>{agent.name}</TableCell>
            <TableCell>
              <Switch checked={!!agent.supervisor} disabled />
            </TableCell>
            <TableCell>
              <Switch checked={!!agent.disabled} disabled />
            </TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(agent)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(agent.id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
 */