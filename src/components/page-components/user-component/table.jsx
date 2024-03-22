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
import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import {
  createMemberships,
  getCardTypeID,
  getCardsTypeByStoreCate,
  getMemberShipById,
} from "@/app/actions";
import CardUser from "./card/card";
import { toast } from "react-toastify";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { RemoveRedEye } from "@mui/icons-material";
import CardAvailable from "./card/card-available";

const UserTable = ({ data, storeTypes, cardTypes, promotions }) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [membership, setMembership] = useState({ items: [] });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAddCard, setOpenAddCard] = useState(false);
  const handleOpenAddCard = () => setOpenAddCard(true);
  const handleCloseAddCard = () => setOpenAddCard(false);

  const handleRowClick = async (row) => {
    setSelectedData(row); // Store the selected row data
    setOpen(true); // Open the ButtonAdd component
    const membershipData = await getMemberShipById(row.userKey);
    setMembership(membershipData.data);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleConfirmOpen = async (userKey, cardKey) => {
    setConfirmOpen(true);
    const data = { userKey, cardKey };

    console.log(data);

    // const res = await createMemberships(data);

    // if (res.data) {
    //   toast.success("Thêm gói thành công");
    // } else {
    //   toast.error("Thêm gói thất bại");
    // }
  };

  const statusMenu = [
    {
      value: 1,
      label: "Đang hoạt động",
      icon: <CheckCircleIcon color="success" />,
    },
    {
      value: 2,
      label: "Ngưng hoạt động",
      icon: <NotInterestedIcon color="error" />,
    },
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
          return statusMenu[0].icon;
        case 2:
          return statusMenu[1].icon;
        case 3:
          return statusMenu[2].icon;
        default:
          return value;
      }
    }
    // If not categoryID or status, return the original value
    return value; // Replace with your mapped value
  };

  const [cardTypesSelect, setCardTypesSelect] = useState([]);
  const [isCardTypeDisabled, setIsCardTypeDisabled] = useState(true);

  const handleStoreTypeChange = async (event) => {
    const storeCategoryId = event.target.value;
    const cardTypesData = await getCardsTypeByStoreCate(storeCategoryId);
    setCardTypesSelect(cardTypesData.data.items);
    setIsCardTypeDisabled(false);
  };

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
              <TableCell>Số điện thoại</TableCell>

              <TableCell>Tổng card</TableCell>
              <TableCell>Xem chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items &&
              data.items.map((row) => (
                <TableRow key={row.userKey}>
                  {/* Use map to display data in cells */}
                  <TableCell>{handleMapData(row.no, "col0")}</TableCell>
                  <TableCell>{handleMapData(row.fullname, "col1")}</TableCell>
                  <TableCell>
                    {handleMapData(row.phoneNumber, "col4")}
                  </TableCell>
                  <TableCell>{handleMapData(row.totalCard, "col4")}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(row)}>
                      <RemoveRedEye color="primary" />
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
        {/* các thẻ hiện sở hữu */}

        <DialogTitle>Các thẻ của người dùng</DialogTitle>
        <DialogActions>
          <Button style={{ marginRight: "20px" }} onClick={handleOpenAddCard}>
            Thêm thẻ
          </Button>
        </DialogActions>
        <DialogContent>
          {/* call storeCategory để hiển thị cho người dùng chọn
           */}

          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {membership &&
              membership.items.map((index) => {
                return (
                  <CardUser
                    key={index.membershipKey}
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

      {/* Thêm thẻ cho người dùng */}
      <Dialog
        open={openAddCard}
        onClose={handleCloseAddCard}
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
            handleCloseAddCard();
          },
        }}
      >
        <DialogTitle>Thêm gói khuyến mãi cho người dùng</DialogTitle>
        <DialogContent>
          <Stack
            style={{ marginTop: "20px" }}
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {memberships &&
              memberships.items.map((index) => {
                return (
                  <CardAvailable
                    key={index.membershipKey}
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
          <Button onClick={handleCloseAddCard}>Hủy</Button>
          {/* <Button type="submit">Thêm</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
