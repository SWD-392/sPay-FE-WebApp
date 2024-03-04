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

  const handleChangeCateValue = (e) => {
    setData({ ...data, status: e.target.value });
  };

  return (
    <>
      <Card sx={{ minWidth: 250, maxWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
            {promotion.name}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {promotion.number}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Chi tiết: {promotion.description}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Ngày bắt đầu: {promotion.insDate}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Ngày kết thúc: {promotion.expiryDate}
          </Typography>
          <Typography variant="body2">{promotion.Price} giá</Typography>
          <Typography variant="body2">
            {promotion.Discount}số tiền khuyến mãi
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Trạng thái: {promotion.status}
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
            id="name"
            name="name"
            label="Tên gói"
            type="text"
            fullWidth
            variant="standard"
            value={data.name}
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="number"
            name="number"
            label="Số ??"
            type="text"
            fullWidth
            variant="standard"
            value={data.number}
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
            id="insDate"
            name="insDate"
            label="Ngày bắt đầu"
            type="text"
            fullWidth
            variant="standard"
            value={data.insDate}
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="expiryDate"
            name="expiryDate"
            label="Ngày kết thúc"
            type="text"
            fullWidth
            variant="standard"
            value={data.expiryDate}
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Giá trị gói"
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
            id="discount"
            name="discount"
            label="Giá trị khuyến mãi"
            type="number"
            fullWidth
            variant="standard"
            value={data.discount}
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
            {statusMenu.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
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
    </>
  );
};

export default CardPromotion;
