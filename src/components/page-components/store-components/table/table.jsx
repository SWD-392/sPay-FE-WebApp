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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { set } from "react-hook-form";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import WalletIcon from "@mui/icons-material/Wallet";
import { createStore, deleteStore } from "@/app/actions";
import { toast } from "react-toastify";
import { createWithdrawInfo } from "@/app/actions/withdraw";

function TableView({ storeData, storeCategory }) {
  const [data, setData] = useState(storeData);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  useEffect(() => {
    setData(storeData);
  }, [storeData]);

  const notifySucess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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

  const handleDelete = async (id) => {
    await deleteStore(id);
  };

  //add store
  const [newStoreData, setNewStoreData] = useState({
    storeName: "",
    description: "",
    storeCategoryKey: "",
    ownerName: "",
    phoneNumber: "",
    balance: 0,
  });

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewStoreData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log("new store", newStoreData);
  }, [newStoreData]);

  //add store
  const handleAddStore = async () => {
    createStore(newStoreData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Save changes to API (you'll need to implement your backend logic)

  const categoriesIdMenu = storeCategory.map((category) => category);

  const StatusEnum = {
    Active: { value: 1, description: "Đang hoạt động" },
    Banned: { value: 2, description: "Bị Khoá" },
  };

  const statusArray = Object.keys(StatusEnum).map((key) => ({
    key,
    ...StatusEnum[key],
  }));

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
      if (value === 1) {
        return "Đang Hoạt động";
      } else if (value === 2) {
        return "Bị khoá";
      } else if (value === 3) {
        return "Đã bị xóa";
      }
    }
    // If not categoryID or status, return the original value
    return value; // Replace with your mapped value
  };

  const [editMode, setEditMode] = useState(false);
  const [cateValue, setCateValue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeCateValue = (event) => {
    setCateValue(event.target.value);
    setSelectedData({ ...selectedData, storeCategory: event.target.value });
  };

  const handleChangeStatusValue = (event) => {
    const value = event.target.value === "true" ? true : false;
    setSelectedData({ ...selectedData, status: value });
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [storeKeyToDelete, setStoreKeyToDelete] = useState(null);

  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [withdrawData, setWithdrawData] = useState({});
  const [userKey, setUserKey] = useState("");
  const [balance, setBalance] = useState(0);
  const handleWithdraw = (row) => {
    setUserKey(row.userKey);
    setBalance(row.balance);
    if (row.balance === 0) {
      toast.error("Số dữ không khả dụng");
      return;
    }
    setWithdrawData({ userKey: row.userKey, totalAmount: 0 });
    setOpenWithdraw(true);
  };

  const handleWithdrawSubmit = async () => {
    const res = await createWithdrawInfo(withdrawData);
    if (res) {
      toast.success("Rút tiền thành công");
      setOpenWithdraw(false);
    } else {
      toast.error("Rút tiền thất bại");
    }
  };

  return (
    <>
      <Button onClick={handleAddClick} variant="text">
        Thêm cửa hàng
      </Button>

      <TableContainer sx={{ minWidth: 1, height: "70vh" }}>
        <Table>
          <TableHead stickyHeader>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "storeName"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("storeName")}
                >
                  Tên
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
                  Tên chủ
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
                  active={sortConfig.key === "description"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("description")}
                >
                  Mô tả
                  {sortConfig.key === "description" ? (
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
                  Phân loại
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
              <TableCell>Rút tiền</TableCell>

              <TableCell>Chỉnh sửa</TableCell>
              <TableCell>Xoá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.storeKey}>
                {/* <TableCell>{row.storeKey}</TableCell> */}
                <TableCell>{handleMapData(row.storeName, "col1")}</TableCell>
                <TableCell>{handleMapData(row.ownerName, "col2")}</TableCell>
                <TableCell>{handleMapData(row.phoneNumber, "col3")}</TableCell>
                <TableCell>{handleMapData(row.description, "col5")}</TableCell>
                <TableCell>
                  {handleMapData(row.storeCategoryName, "col6")}
                </TableCell>
                <TableCell>{handleMapData(row.balance, "col7")}</TableCell>
                {/* edit */}
                <TableCell>
                  <IconButton onClick={() => handleWithdraw(row)}>
                    <WalletIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRowClick(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                {/* delete */}
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setStoreKeyToDelete(row.storeKey);
                      setConfirmOpen(true);
                    }}
                  >
                    <DeleteIcon />
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
              if (!formJson.storeName) {
                alert("Vui lòng nhập tên cửa hàng");
                return;
              }

              if (!formJson.description) {
                alert("Vui lòng nhập mô tả cửa hàng");
                return;
              }

              if (!formJson.ownerName) {
                alert("Vui lòng nhập tên chủ cửa hàng");
                return;
              }

              const phoneRegex = /^[0-9]{10,11}$/;
              if (!phoneRegex.test(formJson.phoneNumber)) {
                alert("Vui lòng nhập số điện thoại hợp lệ");
                return;
              }

              if (!formJson.password || formJson.password.length < 8) {
                alert("Vui lòng nhập mật khẩu có ít nhất 8 ký tự");
                return;
              }
              handleAddStore();
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
              id="description"
              name="description"
              label="Mô tả"
              type="text"
              fullWidth
              variant="standard"
              value={newStoreData.description}
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
              value={newStoreData.phoneNumber}
              onChange={handleAddInputChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Mật khẩu"
              type="password"
              fullWidth
              variant="standard"
              value={newStoreData.password}
              onChange={handleAddInputChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="storeCategoryKey"
              name="storeCategoryKey"
              select
              label="Chọn loại hình cửa hàng"
              fullWidth
              value={newStoreData.storeCategoryKey}
              onChange={handleAddInputChange}
            >
              {storeCategory.map((category) => (
                <MenuItem
                  key={category.storeCategoryKey}
                  value={category.storeCategoryKey}
                >
                  {category.categoryName}
                </MenuItem>
              ))}
            </TextField>
            {/* <TextField
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
              {statusArray.map((status) => (
                <MenuItem key={status.key} value={status.value}>
                  {status.description}
                </MenuItem>
              ))}
            </TextField> */}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              type="submit"
              onClick={() => notifySucess("Thêm cửa hàng mới thành công")}
            >
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
              id="storeCategoryKey"
              name="storeCategoryKey"
              select
              label="Chọn loại hình cửa hàng"
              fullWidth
              value={
                selectedData
                  ? selectedData.categoryName
                  : selectedData.storeCategoryKey
              }
              onChange={handleChangeCateValue}
            >
              {categoriesIdMenu.map((category) => (
                <MenuItem
                  key={category.storeCategoryKey}
                  value={category.storeCategoryKey}
                >
                  {category.categoryName}
                </MenuItem>
              ))}
            </TextField>
            {/* <TextField
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
              {statusArray.map((status) => (
                <MenuItem key={status.key} value={status.value}>
                  {status.description}
                </MenuItem>
              ))}
            </TextField> */}
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

      {/* modal xác nhận xoá */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn xóa cửa hàng này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button
            onClick={() => {
              deleteStore(storeKeyToDelete);
              setConfirmOpen(false);
              notifySucess("Xoá cửa hàng thành công");
            }}
            //  deleteStore(row.storeKey)
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openWithdraw} onClose={() => setOpenWithdraw(false)}>
        <DialogTitle>Rút tiền</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="totalAmount"
            name="totalAmount"
            label="Số tiền muốn rút"
            type="number"
            fullWidth
            variant="standard"
            value={withdrawData.totalAmount}
            onChange={(e) =>
              setWithdrawData({ ...withdrawData, totalAmount: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWithdraw(false)}>Hủy</Button>
          <Button
            onClick={() => {
              handleWithdrawSubmit();
              // console.log(withdrawData);
            }}
          >
            Rút tiền
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TableView;
