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
  Menu,
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

  const StatusEnum = {
    Active: { value: 1, label: "Hoạt động" },
    InActive: { value: 2, label: "Không hoạt động" },
  };

  const statusArray = Object.keys(StatusEnum).map((key) => ({
    key,
    ...StatusEnum[key],
  }));

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
      <Card sx={{ minWidth: 300, maxWidth: 300, minHeight: 450 }}>
        <CardContent>
          <Typography sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
            {data.cardName}
          </Typography>
          {/* <Typography variant="h5" component="div"></Typography> */}

          <Typography sx={{ mb: 1.5, fontSize: 14 }}>
            Ngày tạo gói: {data.insDate}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }}>
            Thời hạn: {data.dateNumber} ngày
          </Typography>
          <Typography variant="body2">
            <Typography sx={{ mb: 1.5 }}>
              Chi tiết gói khuyến mãi: {data.description}
            </Typography>
            Giá bán gói: {data.price} VND
          </Typography>

          <Typography variant="body2">
            Số tiền khách dùng: {data.moneyValue} VND
          </Typography>

          <Typography variant="body2">
            Phần trăm khuyến mãi: {data.discountPercentage}%
          </Typography>
          <Typography variant="body2">Loại thẻ: {data.cardTypeName}</Typography>
          <Typography sx={{ mb: 1.5 }}>
            Trạng thái: {data.status === 1 ? "Hoạt động" : "Không hoạt động"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleEdit(data)}>
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
            value={promotion.cardName}
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
            value={promotion.description}
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
            id="amount"
            name="amount"
            label="Giá bán gói"
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
            id="price"
            name="price"
            label="Số tiền khách dùng"
            type="number"
            fullWidth
            variant="standard"
            value={data.moneyValue}
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
            {statusArray.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
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
