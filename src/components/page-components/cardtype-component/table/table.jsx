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
import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { toast } from "react-toastify";
import { createCardType, deleteCardType, updateCardType } from "@/app/actions";

const CardTypeTable = ({ cardTypes, storeCategory }) => {
  const [data, setData] = useState(cardTypes);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [storeCategoryData, setStoreCategoryData] = useState(storeCategory);

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = (row) => {
    setSelectedData(row);
    setEditMode(true);
    setOpen(true);
  };

  // const onChangeSelectedData = (e) => {
  //   const [name, value] = e.target;
  //   setSelectedData({ ...selectedData, [name]: value });
  // };

  const onChangeSelectedData = (name, value) => {
    setSelectedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCardType = async (formJson) => {
    try {
      const res = await createCardType(formJson);
      if (res.data) {
        toast.success("Thêm loại thẻ mới thành công");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCardType = async (formJson) => {
    console.log("formJson", formJson);
    console.log("seclectedData", selectedData.cardTypeKey);
    const res = await updateCardType(formJson, selectedData.cardTypeKey);
    if (res.data) {
      toast.success("Chỉnh sửa loại thẻ thành công");
    } else {
      toast.error(res.error);
    }
  };

  const delCardType = async (id) => {
    const res = await deleteCardType(id);
    if (res.data) {
      toast.success("Xoá loại thẻ thành công");
    } else {
      toast.error(res.error);
    }
  };

  useEffect(() => {
    // Your side effect goes here. This code will run every time `cardTypes` changes.
  }, [data]);

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
                  active={sortConfig.key === "totalCardUse"}
                  direction={sortConfig.direction}
                  onClick={() => requestSort("totalCardUse")}
                >
                  Đang được dùng
                  {sortConfig.key === "totalCardUse" ? (
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
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.totalCardUse}</TableCell>
                <TableCell>
                  <IconButton
                    disabled={row.totalCardUse > 0}
                    onClick={() => handleEdit(row)}
                    title={
                      row.totalCardUse > 0
                        ? "Không thể chỉnh sửa loại thẻ đang được sử dụng"
                        : ""
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    disabled={row.totalCardUse > 0}
                    onClick={() => delCardType(row.cardTypeKey)}
                    title={
                      row.totalCardUse > 0
                        ? "Không thể xoá loại thẻ đang được sử dụng"
                        : ""
                    }
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
              if (!formJson.cardTypeName) {
                toast.warn("Vui lòng nhập tên loại card");
                return;
              }

              if (!formJson.description) {
                toast.warn("Vui lòng nhập mô tả loại card");
                return;
              }

              if (!formJson.storeCateKey) {
                toast.warn("Vui lòng chọn loại cửa hàng");
                return;
              }
              handleAddCardType(formJson);
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
              id="description"
              name="description"
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
              id="storeCateKey"
              name="storeCateKey"
              label="Loại cửa hàng áp dụng"
              type="text"
              fullWidth
              variant="standard"
              select

              // value={newStoreData.description}
              // onChange={handleAddInputChange}
            >
              {storeCategory &&
                storeCategory.items.map((option) => (
                  <MenuItem
                    key={option.storeCategoryKey}
                    value={option.storeCategoryKey}
                  >
                    {option.categoryName}
                  </MenuItem>
                ))}
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
              if (!formJson.cardTypeName) {
                toast.warn("Vui lòng nhập tên loại card");
                return;
              }

              if (!formJson.description) {
                toast.warn("Vui lòng nhập mô tả loại card");
                return;
              }
              if (!formJson.storeCateKey) {
                toast.warn("Vui lòng nhập mô tả loại card");
                return;
              }
              handleEditCardType(formJson);
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
              value={selectedData.cardTypeName}
              onChange={(event) =>
                onChangeSelectedData("cardTypeName", event.target.value)
              }
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
              value={selectedData.description}
              onChange={(event) =>
                onChangeSelectedData("description", event.target.value)
              }
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="storeCateKey"
              name=""
              label="Loại cửa hàng áp dụng"
              type="text"
              fullWidth
              variant="standard"
              select
              value={selectedData.storeCateKey}
              onChange={(event) =>
                onChangeSelectedData("storeCateKey", event.target.value)
              }
            >
              {storeCategory &&
                storeCategory.items.map((option) => (
                  <MenuItem
                    key={option.storeCategoryKey}
                    value={option.storeCategoryKey}
                  >
                    {option.categoryName}
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
};

export default CardTypeTable;
