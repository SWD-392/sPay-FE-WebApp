"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./table.module.css";

const UserTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRowClick = (row) => {
    setSelectedData(row); // Store the selected row data
    setOpen(true); // Open the ButtonAdd component
    console.log(selectedData);
  };

  const handleMapData = (value, fieldName) => {
    // Implement your mapping logic here (e.g., formatting, converting)
    // You can use value, fieldName, and any other relevant data from the row
    // if (fieldName === "col4") {
    //   // Kiểm tra nếu là categoryID
    //   switch (
    //     value // Ánh xạ giá trị categoryID sang văn bản tương ứng
    //   ) {
    //     case 1:
    //       return categoriesIdMenu[0].label;
    //     case 2:
    //       return categoriesIdMenu[1].label;
    //     case 3:
    //       return categoriesIdMenu[2].label;
    //     default:
    //       return value;
    //   }
    // } else if (fieldName === "col5") {
    //   // Kiểm tra nếu là status
    //   switch (
    //     value // Ánh xạ giá trị status sang văn bản tương ứng
    //   ) {
    //     case 1:
    //       return statusMenu[0].label;
    //     case 2:
    //       return statusMenu[1].label;
    //     case 3:
    //       return statusMenu[2].label;
    //     default:
    //       return value;
    //   }
    // }
    // If not categoryID or status, return the original value
    return value; // Replace with your mapped value
  };

  return (
    <div>
      <TableContainer sx={{ minWidth: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Define table headers based on your data structure */}
              <TableCell>Name</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              {/* <TableCell>Delete</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {/* Use map to display data in cells */}
                <TableCell>{handleMapData(row.name, "col1")}</TableCell>
                <TableCell>{handleMapData(row.createDate, "col2")}</TableCell>
                <TableCell>{handleMapData(row.phone, "col3")}</TableCell>
                {/* <TableCell>{handleMapData(row.categoryID, "col4")}</TableCell> */}
                <TableCell>{handleMapData(row.status, "col5")}</TableCell>
                <TableCell>
                  <IconButton
                    className={styles.customIconButton}
                    onClick={() => handleRowClick(row)}
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
        <DialogTitle>Chỉnh sửa cửa hàng</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên"
            type="text"
            fullWidth
            variant="standard"
            value={selectedData ? selectedData.name : ""}
            disabled
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="address"
            name="address"
            label="Địa chỉ"
            type="text"
            fullWidth
            variant="standard"
            value={selectedData ? selectedData.createDate : ""}
            disabled
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Số điện thoại"
            type="number"
            fullWidth
            variant="standard"
            value={selectedData ? selectedData.phone : ""}
            disabled
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="status"
            name="status"
            select
            label="Chọn status"
            fullWidth
            // value={statusMapping[selectedData.status.value]}
            // onChange={handleChangeStatusValue}
            input={<TextField label="Text" />}
          >
            {/* {statusMenu.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))} */}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Chỉnh sửa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
