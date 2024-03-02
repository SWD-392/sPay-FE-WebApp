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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
  Pagination,
  PaginationItem,
} from "@mui/material";
import styles from "./table.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function TableView({ storeData }) {
  const [editingRow, setEditingRow] = useState(null); // Track currently edited row
  const [editingField, setEditingField] = useState(null); // Track edited field within row
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [data, setData] = useState([storeData]);

  const handleRowClick = (row) => {
    setSelectedData(row); // Store the selected row data
    setEditMode(true);
    setOpen(true); // Open the ButtonAdd component
    console.log(selectedData);
  };
  const handleAddClick = () => {
    setSelectedData({}); // Clear selected data for adding a new store
    setEditMode(false); // Set edit mode to add a new store
    setOpen(true); // Open the dialog
  };

  useEffect(() => {
    setData(storeData); // Update data state whenever storeData changes
  }, [storeData]);

  //add store
  const [newStoreData, setNewStoreData] = useState({
    name: "",
    address: "",
    phone: "",
    categoryId: "",
    status: "",
  });

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewStoreData({
      ...newStoreData,
      [name]: value,
    });
  };

  //add store
  const handleAddStore = async () => {
    try {
      console.log(newStoreData);
      const response = await fetch("/api/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStoreData),
      });
      if (!response.ok) {
        throw new Error("Failed to add store");
      }
      // Xử lý thành công, đóng dialog hoặc thực hiện các thao tác khác
      handleClose();
    } catch (error) {
      console.error("Error adding store:", error);
      // Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
    }
  };
  // Save changes to API (you'll need to implement your backend logic)

  const categoriesIdMenu = [
    { value: 1, label: "Food" },
    { value: 2, label: "Clothes" },
    { value: 3, label: "Accesstory" },
  ];
  const cateMapping = {
    1: "Food",
    2: "Clothes",
    3: "Accesstory",
  };

  const statusMenu = [
    { value: 1, label: "Ban" },
    { value: 2, label: "Active" },
    { value: 3, label: "InActive" },
  ];
  const statusMapping = {
    1: "Ban",
    2: "Active",
    3: "InActive",
  };

  const handleMapData = (value, fieldName) => {
    // Implement your mapping logic here (e.g., formatting, converting)
    // You can use value, fieldName, and any other relevant data from the row
    if (fieldName === "col4") {
      // Kiểm tra nếu là categoryID
      switch (
        value // Ánh xạ giá trị categoryID sang văn bản tương ứng
      ) {
        case 1:
          return categoriesIdMenu[0].label;
        case 2:
          return categoriesIdMenu[1].label;
        case 3:
          return categoriesIdMenu[2].label;
        default:
          return value;
      }
    } else if (fieldName === "col5") {
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
    // If not categoryID or status, return the original value
    return value; // Replace with your mapped value
  };

  const [editMode, setEditMode] = useState(false);
  const [cateValue, setCateValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeCateValue = (event) => {
    setCateValue(event.target.value);
  };

  const handleChangeStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  return (
    <>
      <Button onClick={handleAddClick} variant="text">
        Thêm cửa hàng
      </Button>
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
              {/* <TableCell>Delete</TableCell> */}
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
      {!editMode ? (
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
              // handleCreate(formJson);
              handleClose();
            },
          }}
        >
          <DialogTitle>Thêm cửa hàng</DialogTitle>
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
              value={newStoreData.name}
              onChange={handleAddInputChange}
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
              value={newStoreData.address}
              onChange={handleAddInputChange}
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
              value={newStoreData.phone}
              onChange={handleAddInputChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="categoryId"
              name="categoryId"
              select
              label="Chọn loại hình cửa hàng"
              fullWidth
              value={newStoreData.categoryId}
              onChange={handleAddInputChange}
              input={<TextField label="Text" />}
            >
              {categoriesIdMenu.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              required
              margin="dense"
              id="status"
              name="status"
              select
              label="Chọn status"
              fullWidth
              value={newStoreData.status}
              onChange={handleAddInputChange}
              input={<TextField label="Text" />}
            >
              {statusMenu.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="submit" onClick={handleAddStore}>
              Tạo mới
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
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
              value={selectedData ? selectedData.address : ""}
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
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="categoryID"
              name="categoryID"
              select
              label="Chọn loại hình cửa hàng"
              fullWidth
              value={cateMapping[selectedData.categoryID.value]}
              onChange={handleChangeCateValue}
              input={<TextField label="Text" />}
            >
              {categoriesIdMenu.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              required
              margin="dense"
              id="status"
              name="status"
              select
              label="Chọn status"
              fullWidth
              value={statusMapping[selectedData.status.value]}
              onChange={handleChangeStatusValue}
              input={<TextField label="Text" />}
            >
              {statusMenu.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </TextField>
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
      )}
    </>
  );
}

export default TableView;
