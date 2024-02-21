"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./table.module.css";
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
  Popover,
} from "@mui/material";
// import styles from "./table.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function TableView({ orderData }) {
  const [data, setData] = useState([orderData]);
  const [editingRow, setEditingRow] = useState(null); // Track currently edited row
  const [editingField, setEditingField] = useState(null); // Track edited field within row
  const [openMenuId, setOpenMenuId] = useState(null);
  const buttonRefs = {};

  // Handle cell editing
  const handleEditChange = (rowId, field, newValue) => {
    setData(
      data.map((row) =>
        row.Order === rowId ? { ...row, [field]: newValue } : row
      )
    );
  };

  useEffect(() => {
    setData(orderData); // Update data state whenever orderData changes
  }, [orderData]);

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

  return (
    // <div className={styles.tableContainer}>
    <Grid xs={12}>
      <TableContainer sx={{ minWidth: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Define table headers based on your data structure */}
              <TableCell>OrderID</TableCell>
              <TableCell>WalletID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>DepositID</TableCell>
              <TableCell>StoreWithDrawID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.OrderID}>
                <TableCell>{row.OrderID}</TableCell>
                {/* Use map to display data in cells */}
                <TableCell>{handleMapData(row.WalletID, "col1")}</TableCell>
                <TableCell>{handleMapData(row.Description, "col2")}</TableCell>
                <TableCell>{handleMapData(row.Date, "col3")}</TableCell>
                <TableCell>{handleMapData(row.DepositID, "col4")}</TableCell>
                <TableCell>
                  {handleMapData(row.StoreWithDrawID, "col5")}
                </TableCell>
                <TableCell>{handleMapData(row.Status, "col6")}</TableCell>
                <TableCell
                  editable={
                    editingRow === row.OrderID && editingField === "action"
                  }
                  onDoubleClick={() => setEditingRow(row.OrderID, "action")}
                  // ref={buttonRefs}
                >
                  <IconButton
                    className={styles.customIconButton}
                    ref={(el) => (buttonRefs[row.OrderID] = el)}
                  >
                    Edit
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
