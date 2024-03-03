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

  const handleEdit = (data) => {
    setOpen(true); // Open the ButtonAdd component
  };

  const statusMenu = [
    { value: 1, label: "Active" },
    { value: 2, label: "In Active" },
  ];
  const statusMapping = {
    1: "Active",
    2: "In Active",
  };

  return (
    <>
      <Card sx={{ minWidth: 250, maxWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {promotion.Name}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {promotion.Description}
          </Typography>
          <Typography variant="body2">{promotion.Price}</Typography>
          <Typography variant="body2">{promotion.Status}</Typography>
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
            value={promotion.Name}
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
            value={promotion.Description}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="startDate"
            name="startDate"
            label="Ngày bắt đầu"
            type="text"
            fullWidth
            variant="standard"
            value={promotion.startDate}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="endDate"
            name="endDate"
            label="Ngày kết thúc"
            type="text"
            fullWidth
            variant="standard"
            value={promotion.endDate}
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
            value={promotion.Price}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="promotion"
            name="promotion"
            label="Giá trị khuyến mãi "
            type="number"
            fullWidth
            variant="standard"
            value={promotion.Promotion}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="categoryID"
            name="categoryID"
            select
            label="Trạng thái gói"
            fullWidth
            value={
              promotion.status ? statusMapping[promotion.status.value] : ""
            }
            // onChange={handleChangeCateValue}
            input={<TextField label="Text" />}
          >
            {statusMenu.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
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
