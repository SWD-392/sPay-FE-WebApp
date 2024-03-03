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
  DialogActions,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
// import styles from "./table.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function TableView({ orderData }) {
  const [data, setData] = useState([orderData]);
  const [editingRow, setEditingRow] = useState(null); // Track currently edited row
  const [editingField, setEditingField] = useState(null); // Track edited field within row
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setData(orderData); // Update data state whenever storeData changes
  }, [orderData]);

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
  const typeMenu = [
    { value: 1, label: "Chuyen tien" },
    { value: 2, label: "Rut tien" },
    { value: 3, label: "Nap tien" },
  ];
  const typeMapping = {
    1: "Chuyen tien",
    2: "Rut tien",
    3: "Nap tien",
  };

  const statusMenu = [
    { value: 1, label: "Success" },
    { value: 2, label: "Cancel" },
    { value: 3, label: "In-Progress" },
  ];
  const statusMapping = {
    1: "Success",
    2: "Cancel",
    3: "In-Progress",
  };

  const handleMapData = (value, fieldName) => {
    if (value === null || value === "null") {
      return "Không có dữ liệu";
    }

    if (fieldName === "col6") {
      // Kiểm tra nếu là categoryID
      switch (
        value // Ánh xạ giá trị categoryID sang văn bản tương ứng
      ) {
        case 1:
          return typeMenu[0].label;
        case 2:
          return typeMenu[1].label;
        case 3:
          return typeMenu[2].label;
        default:
          return value;
      }
    } else if (fieldName === "col7") {
      // Kiểm tra nếu là status
      switch (
        value // Ánh xạ giá trị status sang văn bản tương ứng
      ) {
        case 1:
          return statusMenu[0].label;
        case 2:
          return statusMenu[1].label;
        case 3:
          return statusMenu[2].label;
        default:
          return value;
      }
    }
    // Implement your mapping logic here (e.g., formatting, converting)
    // You can use value, fieldName, and any other relevant data from the row
    return value; // Replace with your mapped value
  };

  const handleRowClick = (row) => {
    const mappedRow = {
      ...row,
      WalletID: handleMapData(row.WalletID, "col1"),
      Description: handleMapData(row.Description, "col2"),
      Date: handleMapData(row.Date, "col3"),
      DepositID: handleMapData(row.DepositID, "col4"),
      StoreWithDrawID: handleMapData(row.StoreWithDrawID, "col5"),
      Type: handleMapData(row.Type, "col6"),
      Status: handleMapData(row.Status, "col7"),
    };
    setSelectedData(mappedRow); // Store the selected row data
    setOpen(true); // Open the ButtonAdd component
    console.log(selectedData);
  };

  const handleChangeCateValue = (event) => {
    setCateValue(event.target.value);
  };

  const handleChangeStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  return (
    <>
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
              <TableCell>Type</TableCell>
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
                <TableCell>{handleMapData(row.Type, "col6")}</TableCell>
                <TableCell>{handleMapData(row.Status, "col7")}</TableCell>
                <TableCell
                  editable={
                    editingRow === row.OrderID && editingField === "action"
                  }
                  onDoubleClick={() => setEditingRow(row.OrderID, "action")}
                >
                  <IconButton
                    className={styles.customIconButton}
                    onClick={() =>
                      handleRowClick(handleMapData(row, "fieldName"))
                    }
                  >
                    Edit
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            // console.log(email);
            // handleSave(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>Chỉnh sửa đơn</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="OrderID"
            name="OrderID"
            label="OrderID"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={selectedData ? selectedData.OrderID : ""}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="WalletID"
            name="WalletID"
            label="WalletID"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={selectedData ? selectedData.WalletID : ""}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="Description"
            name="Description"
            label="Mô tả"
            type="text"
            fullWidth
            variant="standard"
            value={selectedData ? selectedData.Description : ""}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="Date"
            name="Date"
            label="Ngày tạo đơn"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={selectedData ? selectedData.Date : ""}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="DepositID"
            name="DepositID"
            label="DepositID"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={selectedData ? selectedData.DepositID : ""}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="StoreWithDrawID"
            name="StoreWithDrawID"
            label="StoreWithDrawID"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={selectedData ? selectedData.StoreWithDrawID : ""}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="Type"
            name="Type"
            label="Loại đơn"
            type="text"
            fullWidth
            variant="standard"
            value={selectedData ? selectedData.Type : ""}
            disabled
          ></TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="Status"
            name="Status"
            label="Trạng thái"
            type="text"
            fullWidth
            variant="standard"
            value={selectedData ? selectedData.Status : ""}
            disabled
            // value={cateMapping[selectedData.categoryID.value]}
          ></TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            type="submit"
            //  onClick={handleSave}
          >
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TableView;
