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
  TableSortLabel,
} from "@mui/material";
import styles from "./table.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { set } from "react-hook-form";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";

function TableView({ storeData }) {
  const [data, setData] = useState(storeData);
  const [editingRow, setEditingRow] = useState(null); // Track currently edited row
  const [editingField, setEditingField] = useState(null); // Track edited field within row
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  console.log(data);
  useEffect(() => {
    setData(storeData);
  }, [storeData]);

  const handleRowClick = (row) => {
    setSelectedData(row); // Store the selected row data
    setEditMode(true);
    setOpen(true); // Open the ButtonAdd component
    // console.log(selectedData);
  };
  const handleAddClick = () => {
    setSelectedData({}); // Clear selected data for adding a new store
    setEditMode(false); // Set edit mode to add a new store
    setOpen(true); // Open the dialog
  };

  //add store
  const [newStoreData, setNewStoreData] = useState({
    storeName: "",
    ownerName: "",
    phoneNumber: "",
    storeCategory: "",
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
    "Food",
    "Clothes",
    "Accesstory",
    "Grocery",
    "Electronics",
  ];

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const statusMenu = ["Active", "InActive", "True"];

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
    } else if (fieldName === "col7") {
      // Kiểm tra nếu là status
      if (value) {
        return "Hoạt động";
      } else {
        return "Ngưng hoạt động";
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

  console.log(selectedData);
  const handleChangeCateValue = (event) => {
    setCateValue(event.target.value);
    setSelectedData({ ...selectedData, storeCategory: event.target.value });
  };

  const handleChangeStatusValue = (event) => {
    const value = event.target.value === "true" ? true : false;
    setSelectedData({ ...selectedData, status: value });
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
              {/* <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "storeKey"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("storeKey")}
                >
                  Store Key
                  {sortConfig.key === "storeKey" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell> */}

              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "storeName"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("storeName")}
                >
                  Tên cửa hàng
                  {sortConfig.key === "storeName" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "ownerName"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("ownerName")}
                >
                  Chủ cửa hàng
                  {sortConfig.key === "ownerName" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "phoneNumber"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("phoneNumber")}
                >
                  Số điện thoại
                  {sortConfig.key === "phoneNumber" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "storeCategory"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("storeCategory")}
                >
                  Phân loại cửa hàng
                  {sortConfig.key === "storeCategory" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "balance"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("balance")}
                >
                  Số dư (VND)
                  {sortConfig.key === "balance" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "insDate"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("insDate")}
                >
                  Ngày tạo
                  {sortConfig.key === "insDate" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => requestSort("status")}>
                <TableSortLabel
                  active={sortConfig.key === "status"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("status")}
                >
                  Trạng thái
                  {sortConfig.key === "status" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.storeKey}>
                {/* <TableCell>{row.storeKey}</TableCell> */}
                <TableCell>{handleMapData(row.storeName, "col1")}</TableCell>
                <TableCell>{handleMapData(row.ownerName, "col2")}</TableCell>
                <TableCell>{handleMapData(row.phoneNumber, "col3")}</TableCell>
                <TableCell>
                  {handleMapData(row.storeCategory, "col4")}
                </TableCell>
                <TableCell>{handleMapData(row.balance, "col5")}</TableCell>
                <TableCell>{handleMapData(row.insDate, "col6")}</TableCell>
                <TableCell>{handleMapData(row.status, "col7")}</TableCell>
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
              id="storeName"
              name="storeName"
              label="Tên"
              type="text"
              fullWidth
              variant="standard"
              value={newStoreData.storeName}
              onChange={handleAddInputChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="ownerName"
              name="ownerName"
              label="Chủ cửa hàng"
              type="text"
              fullWidth
              variant="standard"
              value={newStoreData.ownerName}
              onChange={handleAddInputChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
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
              id="storeCategory"
              name="storeCategory"
              select
              label="Chọn loại hình cửa hàng"
              fullWidth
              value={newStoreData.storeCategory}
              onChange={handleAddInputChange}
            >
              {categoriesIdMenu.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
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
            >
              <MenuItem key="true" value={true}>
                Hoạt động
              </MenuItem>
              <MenuItem key="false" value={false}>
                Ngưng hoạt động
              </MenuItem>
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
              id="storeName"
              name="storeName"
              label="Tên"
              type="text"
              fullWidth
              variant="standard"
              value={selectedData ? selectedData.storeName : ""}
              disabled
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="ownerName"
              name="ownerName"
              label="Chủ cửa hàng"
              type="text"
              fullWidth
              variant="standard"
              value={selectedData ? selectedData.ownerName : ""}
              disabled
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              label="Số điện thoại"
              type="number"
              fullWidth
              variant="standard"
              value={selectedData ? selectedData.phoneNumber : ""}
              disabled
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="storeCategory"
              name="storeCategory"
              select
              label="Chọn loại hình cửa hàng"
              fullWidth
              value={selectedData ? selectedData.storeCategory : ""}
              onChange={handleChangeCateValue}
            >
              {categoriesIdMenu.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
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
              value={selectedData ? selectedData.status : ""}
              onChange={handleChangeStatusValue}
            >
              <MenuItem key="true" value="true">
                Hoạt động
              </MenuItem>
              <MenuItem key="false" value="false">
                Ngưng hoạt động
              </MenuItem>
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
