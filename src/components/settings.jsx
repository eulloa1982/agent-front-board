import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
} from "@mui/material";
//import ItemDialog from "./settings/itemDialog";
import TableAgents from "./settings/tableAgents";
import TableCategories from "./settings/tableCategories";
import { useAgents } from "../utils/useAgents";
import { useCategories } from "../utils/useCategories";

const Settings = () => {
  const [tab, setTab] = useState(0);
  //const [dialogOpen, setDialogOpen] = useState(false);
  //const [editItem, setEditItem] = useState(null);
  //const [newName, setNewName] = useState("");

  const {
    agents,
    setAgents,
    loading: agentsLoading,
    error: agentsError,
  } = useAgents();
  const {
    categories,
    setCategories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  

  const tabLabel = tab === 0 ? "Agente" : "Categoría";

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Status
        </Typography>

        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab label="Agents" />
          <Tab label="Categories" />
        </Tabs>

        <Box mt={2}>
          
          {tab === 0 ? (
            <TableAgents
              agents={agents}
              loading={agentsLoading}
              error={agentsError}
            />
          ) : (
            <TableCategories
              categories={categories}
              loading={categoriesLoading}
              error={categoriesError}
            />
          )}
        </Box>

      </CardContent>
    </Card>
  );
};

export default Settings;
/*
const handleOpenDialog = (item = null) => {
    setEditItem(item);
    setNewName(item ? item.name : "");
    setDialogOpen(true);
  };

  const handleSave = () => {
    const isEditing = !!editItem;
    const updateFn = tab === 0 ? setAgents : setCategories;
    const items = tab === 0 ? agents : categories;

    const newItem = {
      id: isEditing ? editItem.id : Date.now(),
      name: newName,
    };

    if (isEditing) {
      updateFn(items.map((i) => (i.id === editItem.id ? newItem : i)));
    } else {
      updateFn([...items, newItem]);
    }

    setDialogOpen(false);
    setEditItem(null);
    setNewName("");
  };

  const handleDelete = (id) => {
    const updateFn = tab === 0 ? setAgents : setCategories;
    const items = tab === 0 ? agents : categories;
    updateFn(items.filter((i) => i.id !== id));
  };


<Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Configuración
        </Typography>

        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab label="Agentes" />
          <Tab label="Categorías" />
        </Tabs>

        <Box mt={2}>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Agregar {tabLabel}
          </Button>

          {tab === 0 ? (
            <TableAgents
              agents={agents}
              onEdit={handleOpenDialog}
              onDelete={handleDelete}
              loading={agentsLoading}
              error={agentsError}
            />
          ) : (
            <TableCategories
              categories={categories}
              onEdit={handleOpenDialog}
              onDelete={handleDelete}
              loading={categoriesLoading}
              error={categoriesError}
            />
          )}
        </Box>

        <ItemDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          value={newName}
          onChange={setNewName}
          onSave={handleSave}
          label={tabLabel}
        />
      </CardContent>
    </Card>*/