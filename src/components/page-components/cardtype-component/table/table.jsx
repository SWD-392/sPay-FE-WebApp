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
  TableSortLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";

const CardTypeTable = ({ cardTypes }) => {
  const [data, setData] = useState(cardTypes);
  const [open, setOpen] = useState(false);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = Array.isArray(data) ? [...data] : [];
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

  const handleAddClick = () => {
    // setSelectedData({}); // Clear selected data for adding a new store
    setEditMode(false); // Set edit mode to add a new store
    setOpen(true); // Open the dialog
  };

  const [editMode, setEditMode] = useState(false);
  const [cateValue, setCateValue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleAddClick} variant="text">
        Thêm loại thẻ mới
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "cardTypeName"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("cardTypeName")}
                >
                  Tên Card
                  {sortConfig.key === "cardTypeName" ? (
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
                  active={sortConfig.key === "typeDescription"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("typeDescription")}
                >
                  Mô tả
                  {sortConfig.key === "typeDescription" ? (
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
                  active={sortConfig.key === "withdrawalAllowed"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("withdrawalAllowed")}
                >
                  Rút tiền
                  {sortConfig.key === "withdrawalAllowed" ? (
                    sortConfig.direction === "ascending" ? (
                      <ArrowDropUpSharpIcon />
                    ) : (
                      <ArrowDropDownSharpIcon />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>Chỉnh sửa</TableCell>
              <TableCell>Xoá</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.cardTypeKey}>
                <TableCell>{row.cardTypeName}</TableCell>
                <TableCell>{row.typeDescription}</TableCell>
                <TableCell>
                  {row.withdrawalAllowed ? "Cho phép" : "Không cho phép"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRowClick(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteStore(row.storeKey)}>
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
          <DialogTitle>Thêm Loại thẻ mới</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="cardTypeName"
              name="cardTypeName"
              label="Tên card"
              type="text"
              fullWidth
              variant="standard"
              // value={newStoreData.storeName}
              // onChange={handleAddInputChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="typeDescription"
              name="typeDescription"
              label="Mô tả"
              type="text"
              fullWidth
              variant="standard"
              // value={newStoreData.description}
              // onChange={handleAddInputChange}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="withdrawalAllowed"
              name="withdrawalAllowed"
              select
              label="Trạng thái rút tiền"
              fullWidth
              // value={newStoreData.storeCategoryKey}
              // onChange={handleAddInputChange}
            >
              {/* {categoriesIdMenu.map((category) => (
                <MenuItem
                  key={category.storeCategoryKey}
                  value={category.storeCategoryKey}
                >
                  {category.storeCategoryName}
                </MenuItem>
              ))} */}
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="submit">Tạo mới</Button>
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
              id="cardTypeName"
              name="cardTypeName"
              label="Tên card"
              type="text"
              fullWidth
              variant="standard"
              // value={selectedData ? selectedData.storeName : ""}
              disabled
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="typeDescription"
              name="typeDescription"
              label="Mô tả"
              type="text"
              fullWidth
              variant="standard"
              // value={selectedData ? selectedData.ownerName : ""}
              disabled
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="withdrawalAllowed"
              name="withdrawalAllowed"
              select
              label="Trạng thái rút tiền"
              fullWidth
              // value={
              //   selectedData
              //     ? selectedData.storeCategoryKey
              //     : selectedData.storeCategoryName
              // }
              // onChange={handleChangeCateValue}
            >
              {/* {categoriesIdMenu.map((category) => (
                <MenuItem
                  key={category.storeCategoryKey}
                  value={category.storeCategoryKey}
                >
                  {category.storeCategoryName}
                </MenuItem>
              ))} */}
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
};

export default CardTypeTable;
