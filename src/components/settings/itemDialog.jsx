import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ItemDialog = ({ open, onClose, value, onChange, onSave, label }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{value ? `Editar ${label}` : `Agregar ${label}`}</DialogTitle>
    <DialogContent>
      <TextField
        label="Nombre"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        autoFocus
        sx={{ mt: 1 }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button variant="contained" onClick={onSave} disabled={!value.trim()}>
        Guardar
      </Button>
    </DialogActions>
  </Dialog>
);

export default ItemDialog;
