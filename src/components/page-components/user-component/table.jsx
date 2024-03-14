"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import styles from "./table.module.css";
import { getCardTypeID } from "@/app/actions/card-type";
import CardUser from "./card/card";
import { toast } from "react-toastify";

const UserTable = ({ data, storeTypes, cardTypes, promotions }) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRowClick = (row) => {
    setSelectedData(row); // Store the selected row data
    setOpen(true); // Open the ButtonAdd component
    console.log(selectedData);
  };
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleConfirmOpen = () => setConfirmOpen(true);

  const statusMenu = [
    { value: 1, label: "Đang hoạt động" },
    { value: 2, label: "Ngưng hoạt động" },
  ];

  const handleMapData = (value, fieldName) => {
    // Implement your mapping logic here (e.g., formatting, converting)
    // You can use value, fieldName, and any other relevant data from the row
    if (fieldName === "col4") {
      // Kiểm tra nếu là categoryID
      // switch (
      //   value // Ánh xạ giá trị categoryID sang văn bản tương ứng
      // ) {
      //   case 1:
      //     return categoriesIdMenu[0].label;
      //   case 2:
      //     return categoriesIdMenu[1].label;
      //   case 3:
      //     return categoriesIdMenu[2].label;
      //   default:
      //     return value;
      // }
    } else if (fieldName === "col6") {
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

  const [cardTypesSelect, setCardTypesSelect] = useState(cardTypes ?? []);
  const [isCardTypeDisabled, setIsCardTypeDisabled] = useState(true);

  const handleStoreTypeChange = async (event) => {
    const storeCategoryId = event.target.value;
    console.log(storeCategoryId);
    const cardTypesData = await getCardTypeID(storeCategoryId);
    setCardTypesSelect(cardTypesData.data);
    setIsCardTypeDisabled(false);
  };

  console.log("promotions", promotions.items);

  const notifySuccess = (message) => {
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
  };

  return (
    <div>
      <TableContainer sx={{ minWidth: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Define table headers based on your data structure */}
              <TableCell>No.</TableCell>
              <TableCell>Họ tên khách</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Tổng card</TableCell>
              <TableCell>Số dư</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thêm gói</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items &&
              data.items.map((row) => (
                <TableRow key={row.customerKey}>
                  {/* Use map to display data in cells */}
                  <TableCell>{handleMapData(row.no, "col0")}</TableCell>
                  <TableCell>
                    {handleMapData(row.customerName, "col1")}
                  </TableCell>
                  <TableCell>{handleMapData(row.email, "col2")}</TableCell>
                  <TableCell>{handleMapData(row.address, "col3")}</TableCell>
                  <TableCell>{handleMapData(row.numOfCards, "col4")}</TableCell>
                  <TableCell>{handleMapData(row.balance, "col5")}</TableCell>
                  <TableCell>{handleMapData(row.status, "col6")}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(row)}>
                      <AddIcon color="primary" />
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
        maxWidth="md"
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
        <DialogTitle>Thêm gói khuyến mãi cho người dùng</DialogTitle>
        <DialogContent>
          {/* call storeCategory để hiển thị cho người dùng chọn
           */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="storeKey"
            name="storeKey"
            label="Loại cửa hàng"
            type="text"
            fullWidth
            variant="standard"
            // value={selectedData ? selectedData.customerName : ""}
            select
            onChange={handleStoreTypeChange}
            //  chỗ này hiển thị các giá trị của storecate
          >
            {storeTypes.map((index) => (
              <MenuItem
                key={index.storeCategoryKey}
                value={index.storeCategoryKey}
              >
                {index.storeCategoryName}
              </MenuItem>
            ))}
          </TextField>

          {/* đoạn này hiển thị cardtype để chọn */}

          <TextField
            autoFocus
            required
            margin="dense"
            id="cardTypeKey"
            name="cardTypeKey"
            label="cardTypeName"
            type="text"
            fullWidth
            variant="standard"
            // value={selectedData ? selectedData.lastName : ""}
            select
            disabled={isCardTypeDisabled}
            // chỗ này hiển thị các giá trị của cardtype
          >
            {/* {cardTypesSelect.map((index) => (
              <MenuItem key={index.cardTypeKey} value={index.cardTypeKey}>
                {index.cardTypeName}
              </MenuItem>
            ))} */}
          </TextField>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {promotions &&
              promotions.items.map((index) => {
                return (
                  <CardUser
                    key={index.cardKey}
                    data={index}
                    onChoose={handleConfirmOpen}
                  />
                );
              })}
          </Stack>

          {/* đoạn dưới này hiển thị các card để chọn */}
          <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
            <DialogTitle>Xác nhận</DialogTitle>
            <DialogContent>Bạn có chắc chắn muốn chọn gói này?</DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
              <Button
                // onClick={handleConfirm}
                onClick={() => notifySuccess("Thêm gói thành công")}
              >
                Đồng ý
              </Button>
            </DialogActions>
          </Dialog>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          {/* <Button type="submit">Thêm</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
