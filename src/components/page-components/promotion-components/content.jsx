"use client";
import React from "react";
import CardPromotion from "@/components/page-components/promotion-components/card-promotion";
import styles from "./content.module.css";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
const PromotionCompo = ({ promotions }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const statusMenu = [
    { value: 1, label: "Active" },
    { value: 2, label: "In Active" },
  ];
  const statusMapping = {
    1: "Active",
    2: "InActive",
  };

  const [newPromotionData, setNewPromotionData] = useState({
    name: "",
    number: "",
    description: "",
    insDate: "",
    expiryDate: "",
    price: "",
    discount: "",
    status: "",
  });

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromotionData({
      ...newPromotionData,
      [name]: value,
    });
  };

  //add store
  const handleAddPromotion = async () => {
    try {
      console.log(newPromotionData);
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
  return (
    <div>
      <Button onClick={handleOpen}> Thêm gói mới </Button>
      <div className={styles.display}>
        {promotions.map((promotion) => (
          <CardPromotion key={promotion.cardKey} promotion={promotion} />
        ))}
      </div>
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
        <DialogTitle>Thêm gói khuyến mãi</DialogTitle>
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
            // value={promotion.Name}
            onChange={handleAddInputChange}
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
            // value={promotion.Description}
            onChange={handleAddInputChange}
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
            // value={promotion.Date}
            onChange={handleAddInputChange}
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
            // value={promotion.Date}
            onChange={handleAddInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="expiryDate"
            name="expiryDate"
            label="Ngày kết thúc"
            type="number"
            fullWidth
            variant="standard"
            // value={promotion.Price}
            onChange={handleAddInputChange}
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
            // value={promotion.Promotion}
            onChange={handleAddInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="promo"
            name="promo"
            label="Giá trị khuyến mãi"
            type="number"
            fullWidth
            variant="standard"
            // value={promotion.Promotion}
            onChange={handleAddInputChange}
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
            // value={
            //   promotion.status ? statusMapping[promotion.status.value] : ""
            // }
            input={<TextField label="Text" />}
            onChange={handleAddInputChange}
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
          <Button type="submit" onClick={handleAddPromotion}>
            Thêm gói
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PromotionCompo;