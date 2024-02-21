"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import styles from "./table.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function TableView({ storeData }) {
  const [data, setData] = useState([storeData]);
  const [editingRow, setEditingRow] = useState(null); // Track currently edited row
  const [editingField, setEditingField] = useState(null); // Track edited field within row
  const [openMenuId, setOpenMenuId] = useState(null);
  const buttonRef = React.useRef(null);

  // Handle cell editing
  const handleEditChange = (rowId, field, newValue) => {
    setData(
      data.map((row) =>
        row.id === rowId ? { ...row, [field]: newValue } : row
      )
    );
  };

  useEffect(() => {
    setData(storeData); // Update data state whenever storeData changes
  }, [storeData]);

  // Save changes to API (you'll need to implement your backend logic)
  const handleSave = async (row) => {
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        body: JSON.stringify(row),
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      // Update state with successful response (if applicable)
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleMapData = (value, fieldName) => {
    // Implement your mapping logic here (e.g., formatting, converting)
    // You can use value, fieldName, and any other relevant data from the row
    return value; // Replace with your mapped value
  };

  const handleMenuOpen = (rowId) => {
    setOpenMenuId(rowId);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  const handleButtonClick = (event, value) => {
    // event.stopPropagation(); // Prevent immediate closure when clicking the button itself
    handleMenuOpen(value);
  };

  return (
    // <div className={styles.tableContainer}>
    <Grid xs={12}>
      <TableContainer sx={{ minWidth: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Define table headers based on your data structure */}
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                {/* Use map to display data in cells */}
                <TableCell>{handleMapData(row.name, "col1")}</TableCell>
                <TableCell>{handleMapData(row.address, "col2")}</TableCell>
                <TableCell>{handleMapData(row.phone, "col3")}</TableCell>
                <TableCell>{handleMapData(row.categoryID, "col4")}</TableCell>
                <TableCell>{handleMapData(row.status, "col5")}</TableCell>
                <TableCell
                  editable={editingRow === row.id && editingField === "action"}
                  onDoubleClick={() => setEditingRow(row.id, "action")}
                >
                  <IconButton className={styles.customIconButton}>
                    Edit
                  </IconButton>
                </TableCell>
                <TableCell
                  editable={editingRow === row.id && editingField === "action"}
                  onDoubleClick={() => setEditingRow(row.id, "action")}
                >
                  <IconButton className={styles.customIconButtonDel}>
                    Delete
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default TableView;
