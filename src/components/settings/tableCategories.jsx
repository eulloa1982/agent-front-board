// components/settings/tableCategories.jsx
import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
 // IconButton,
} from "@mui/material";
//import { Edit, Delete } from "@mui/icons-material";

const TableCategories = ({ categories, loading, error }) => {
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p style={{ color: "red" }}>Error loading categories</p>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell>{cat.id}</TableCell>
            <TableCell>{cat.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableCategories;

/**
 * <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell>{cat.id}</TableCell>
            <TableCell>{cat.name}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(cat)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(cat.id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
 */