"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CardPromotion = ({ promotion }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState(promotion);
  const handleEdit = (data) => {
    setOpen(true); // Open the ButtonAdd component
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const statusMenu = ["Active", "In Active"];
  const statusMapping = {
    1: "Active",
    2: "InActive",
  };

  const handleChangeCateValue = (event) => {
    const value = event.target.value;
    setData({ ...data, status: value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log(data);
    // Call your API to save the data
    // For example:
    // api.saveData(data).then(response => {
    //   if (response.ok) {
    //     // Close the dialog
    //     handleClose();
    //   } else {
    //     // Handle the error
    //     console.error('Failed to save data');
    //   }
    // });
  };

  return (
    <>
      <Card sx={{ minWidth: 250, maxWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
            {promotion.cardName}
          </Typography>
          {/* <Typography variant="h5" component="div"></Typography> */}
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Chi tiết: {promotion.description}
          </Typography>

          <Typography sx={{ mb: 1.5, fontSize: 14 }}>
            Ngày tạo gói: {promotion.insDate}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }}>
            Thời hạn: {promotion.dateNumber} ngày
          </Typography>
          <Typography variant="body2">
            <Typography sx={{ mb: 1.5, fontSize: 20 }}>
              Tên gói khuyến mãi: {promotion.packageName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Chi tiết gói khuyến mãi: {promotion.packageDescription}
            </Typography>
            Giá bán gói: {promotion.price} VND
          </Typography>

          <Typography variant="body2">
            Số tiền khách dùng: {promotion.amount} VND
          </Typography>

          <Typography sx={{ mb: 1.5 }}>
            Trạng thái:{" "}
            {promotion.status === "True" ? "Đang hoạt động" : "Ngưng hoạt động"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleEdit(promotion)}>
            Tuỳ Chỉnh
          </Button>
        </CardActions>
      </Card>
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
        <DialogTitle>Chỉnh sửa gói khuyến mãi</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="cardName"
            name="cardName"
            label="Tên gói"
            type="text"
            fullWidth
            variant="standard"
            value={data.cardName}
            onChange={handleEditInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Mô tả gói"
            type="text"
            fullWidth
            variant="standard"
            value={data.description}
            onChange={handleEditInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="dateNumber"
            name="dateNumber"
            label="Thời hạn(ngày)"
            type="text"
            fullWidth
            variant="standard"
            value={data.dateNumber}
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="packageName"
            name="packageName"
            label="Tên gói khuyến mãi"
            type="text"
            fullWidth
            variant="standard"
            value={data.packageName}
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="packageDescription"
            name="packageDescription"
            label="Mô tả gói khuyến mãi"
            type="text"
            fullWidth
            variant="standard"
            value={data.packageDescription}
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Giá bán gói"
            type="number"
            fullWidth
            variant="standard"
            value={data.amount}
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Số tiền khách dùng"
            type="number"
            fullWidth
            variant="standard"
            value={data.price}
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="status"
            name="status"
            select
            label="Trạng thái gói"
            fullWidth
            value={data.status}
            onChange={handleChangeCateValue}
          >
            <MenuItem key="true" value={"Active"}>
              Hoạt động
            </MenuItem>
            <MenuItem key="false" value={"DeActive"}>
              Ngưng hoạt động
            </MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit" onClick={handleSave}>
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardPromotion;
